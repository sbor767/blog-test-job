import React, { Component } from 'react'
import Header from '../../components/header'

import users from '../../api/rest-like/users'
import './style.css'

export default class SignInPage extends Component {
  state = { login: '', password: '', error: '' }

  handleLoginChange = event => this.setState({ login: event.target.value})

  handlePasswordChange = event => this.setState({ password: event.target.value})

  handleSubmit = event => {
    event.preventDefault()
    this.setState({ error: '' })
    if (this.state.login && this.state.password) {
      this.login({ login: this.state.login, password: this.state.password })
    } else {
      this.setState({ error: 'Please fill in both fields.' })
    }

    console.log(this.state)
  }

  onLogin() {
    // Redirect to '/'.
    this.props.history.push('/')
  }

  login(loginData) {
    users.getUserLogged(loginData)
      .then(user => {
        this.props.onSubmit(user)
        this.onLogin()
      })
      .catch(err => {
        this.setState({ error: `Error loggin in: ${err}` })
      })
  }

  render = () => (
    <div id='LoginContainer' className='inner-container'>
      <Header />
      <form onSubmit={this.handleSubmit}>
        <p>Sign in or sign up by entering your login and password.</p>
        <div className="SignInPage__note">
          <p>
            Use next test users credentials<br />
            (Login : password):
          </p>
          <ul className="SignInPage__note__ul">
            <li>'John N.' : 111</li>
            <li>'Alexandr M.' : 222</li>
            <li>'Leonardo D.' : 333</li>
          </ul>
        </div>
        <input
          type='text'
          onChange={this.handleLoginChange}
          value={this.state.login}
          placeholder='Your login (basically name)'
        />
        <input
          type='password'
          onChange={this.handlePasswordChange}
          value={this.state.password}
          placeholder='Your password'
        />
        <p className="error">{this.state.error}</p>
        <button className='red light' type='submit'>Login</button>
      </form>

    </div>
  )
}