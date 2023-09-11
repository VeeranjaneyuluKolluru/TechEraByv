import {Component} from 'react'
import Loader from 'react-loader-spinner'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {
    isLoading: apiStatusConstants.initial,
    result: {},
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({isLoading: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (response.ok === true) {
      const del = await response.json()
      const data = {
        id: del.course_details.id,
        name: del.course_details.name,
        imageUrl: del.course_details.image_url,
        description: del.course_details.description,
      }

      this.setState({
        isLoading: apiStatusConstants.success,
        result: data,
      })
    } else {
      this.setState({
        isLoading: apiStatusConstants.fail,
      })
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getCourseDetails}>
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {result} = this.state
    return (
      <div>
        <img src={result.imageUrl} alt={result.name} />
        <div>
          <h1>{result.name}</h1>
          <p>{result.description}</p>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    switch (isLoading) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.fail:
        return this.renderFailure()

      default:
        return null
    }
  }
}

export default CourseItemDetails
