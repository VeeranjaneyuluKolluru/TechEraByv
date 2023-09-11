import {Route, Switch} from 'react-router-dom'
import Home from './Components/Home'
import CourseItemDetails from './Components/CourseItemDetails'
import NotFound from './Components/NotFound'
import Header from './Components/Header'
import './App.css'

// Replace your code here
const App = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={CourseItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
