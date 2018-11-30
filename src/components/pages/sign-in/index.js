import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { user } from '../../../api'
// import * as actions from '../../../store/actions.js'
import { LayoutPage } from '../../ui/layouts'
import { Input, Button } from '../../ui/elements'
import { Header } from '../..'
import './style.css'


export default class PagesSignIn extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
  }


  state = {login: '', password: '', error: ''}

  handleLoginChange = login => this.setState({ login, error: '' })

  handlePasswordChange = password => this.setState({ password })

  handleSubmit = event => {
    event.preventDefault()
    this.setState({ error: '' })
    if (this.state.login && this.state.password) {
      this.login({ login: this.state.login, password: this.state.password })
    } else {
      this.setState({ error: 'Please fill in both fields.' })
    }
  }

  afterLogin() {
    this.props.history.goBack()
  }

  login(loginData) {
    const { onLogin } = this.props
    user.userLogin(loginData)
      .then(user => {
        onLogin(user)
        this.afterLogin()
      })
      .catch(err => {
        this.setState({ error: `Error login in: ${err}` })
      })
  }


  render() {

    const header = <Header title="Login page" inSignPage className="PagesSignIn__header" />

    const VerticalCenterWrapper = ({ children }) => <div className="PagesSignIn__hintVerticalCenter">{children}</div>


    return (
      <LayoutPage header={header} className="PagesSignIn">


        <div className="PagesSignIn__contentCenter">

          <div className="PagesSignIn__h2">Sign in by entering your login and password</div>

          <div className="PagesSignIn__row">

            <div className="PagesSignIn__hint">
              <VerticalCenterWrapper>
                <div className="PagesSignIn__hintItem PagesSignIn__hintTop">
                  Use one from the next test users credentials:
                </div>
              </VerticalCenterWrapper>
              <VerticalCenterWrapper>
                <div className="PagesSignIn__hintItem PagesSignIn__hintMiddle">
                  (Login : password)
                </div>
              </VerticalCenterWrapper>
              <ul className="PagesSignIn__hintItem PagesSignIn__hintBottom">
                <li>'John N.' : 111</li>
                <li>'Alexandr M.' : 222</li>
                <li>'Leonardo D.' : 333</li>
              </ul>
            </div>

            <form onSubmit={this.handleSubmit} className="PagesSignIn__form">

              <Input
                type="text"
                onChange={this.handleLoginChange}
                value={this.state.login}
                placeholder="Your login (basically name)"
                className="PagesSignIn__formInput PagesSignIn__formInputLogin"
              />

              <Input
                type="password"
                onChange={this.handlePasswordChange}
                value={this.state.password}
                placeholder="Your password"
                className="PagesSignIn__formInput PagesSignIn__formInputPassword"
              />

              {!!this.state.error && <p className="PagesSignIn__error">{this.state.error}</p>}
              <Button className="PagesSignIn__formButton" type="submit">Submit</Button>

            </form>

          </div>

        </div>

      </LayoutPage>
    )
  }
}