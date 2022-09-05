import {Route, Switch, Redirect} from 'react-router-dom'

import HomeRoute from './components/HomeRoute'
import CourseItem from './components/CourseItem'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={HomeRoute} />
    <Route exact path="/courses/:id" component={CourseItem} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
