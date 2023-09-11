import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    isLoading: apiStatusConstants.initial,
    result: [],
  }

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({isLoading: apiStatusConstants.inProgress})
    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok === true) {
      const del = await response.json()
      const data = del.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))

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
      <button type="button" onClick={this.getCourses()}>
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {result} = this.state
    return (
      <ul>
        {result.map(each => (
          <Link to={`/courses/${each.id}`}>
            <li key={each.id}>
              <img src={each.logoUrl} alt={each.name} />
              <p>{each.name}</p>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    switch (isLoading) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.fail:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()

      default:
        return null
    }
  }
}

export default Home
