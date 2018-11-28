import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../store/actions.js'
import { Button, ButtonLink } from '../ui/elements'
import './style.css'
import PropTypes from 'prop-types'


class SignInOut extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    inSignPage: PropTypes.bool
  }

  static defaultProps = {
    inSignPage: false
  }


  signOut = () => actions.user.signOut()(this.props.dispatch)

  static markup = (type) => (
    <div className={`SignInOut__buttonDisc SignInOut__button${type}Disc`}>
      <span className='SignInOut__buttonText'>
        {`Sign${type}`}
      </span>
    </div>
  )


  render() {

    const { user, inSignPage } = this.props

    return (
    <div className="SignInOut">
    {!!user.id ? (
      <Fragment>
        <Button onClick={this.signOut} className='SignInOut__signOutButton'>
          {SignInOut.markup('Out')}
        </Button>
        <div className="SignInOut__greeting">Welcome <span className="SignInOut__greetingName">{user.name}</span></div>
      </Fragment>
    ) : (
      <Fragment>
        <ButtonLink to={'/sign-in'} disabled={inSignPage} className='SignInOut__signInButton'>
          {SignInOut.markup('In')}
        </ButtonLink>
        <div className="SignInOut__greeting">Sign in to be a <span className="SignInOut__greetingAccent">right</span> guy</div>
      </Fragment>
    )}
    </div>
  )}
}


const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(SignInOut)