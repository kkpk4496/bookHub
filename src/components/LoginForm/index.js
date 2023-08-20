import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  LoginSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, showError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dzo0il2vd/image/upload/v1691078909/BookshubLoginPage_xjsklp.png"
          alt="website login"
          className="login-image"
        />
        <form className="login-form" onSubmit={this.LoginSubmit}>
          <img
            src="https://res.cloudinary.com/dzo0il2vd/image/upload/v1691079962/BookHubLogo_xfuzpn.png"
            alt="login website logo"
          />
          <div className="input-container">
            <label htmlFor="username">Username*</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="inputs"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="inputs"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showError ? <p className="error">{errorMsg}</p> : ''}
        </form>
      </div>
    )
  }
}

export default LoginForm
