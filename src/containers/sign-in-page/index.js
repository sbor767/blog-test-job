import React, { Component } from 'react'
// import dispatch from 'react-redux'

import { user } from '../../api'
import * as actions from '../../store/actions.js'
import LayoutCentreWrapper from '../../components/layouts/layout-centre-wrapper'
import Header from '../../components/header'
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

    // console.log(this.state)
  }

  onLogin() {
    // Redirect to '/'.
    this.props.history.push('/')
  }

  login(loginData) {
    const onLogin  = this.props.onLogin
    user.userLogin(loginData)
      .then(user => {
        console.log('SignInPage-user', user)
        // onLogin(actions.user.signIn(user))
        onLogin(user)
        this.onLogin()
      })
      .catch(err => {
        this.setState({ error: `Error login in: ${err}` })
      })
  }

  render = () => (
    <LayoutCentreWrapper className="SignInPage">
      <Header />
      <form onSubmit={this.handleSubmit} className="SignInPage__form">
        <p>Sign in or sign up by entering your login and password.</p>
        <div className="SignInPage__form__note">
          <p>
            Use next test users credentials<br />
            (Login : password):
          </p>
          <ul className="SignInPage__form__note__ul">
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
          className="SignInPage__form__input"
        />
        <input
          type='password'
          onChange={this.handlePasswordChange}
          value={this.state.password}
          placeholder='Your password'
          className="SignInPage__form__input"
        />
        <p className="error">{this.state.error}</p>
        <button className='red light' type='submit'>Login</button>
      </form>

    </LayoutCentreWrapper>
  )
}