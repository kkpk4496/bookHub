import './App.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import BookView from './components/BookView'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import BookShelve from './components/BookShelve'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/shelf" component={BookShelve} />
    <ProtectedRoute exact path="/books/:id" component={BookView} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
