import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import './style.css'
import * as actions from '../../store/actions.js'
import Button from '../button'
import ButtonTo from '../button-to'

function SignInOut({ user, dispatch }) {

  const signOut = () => actions.user.signOut()(dispatch)


  return (
    <div className="SignInOut">
    {!!user.id ? (
      <Fragment>
        <Button title={'SignOut'} onClick={signOut} className={['SignInOut__signOutButton']}/>
        <div className="SignInOut__greeting">Welcome <span className="SignInOut__greetingName">{user.name}</span></div>
      </Fragment>
    ) : (
        /* @TODO Add history  */
      <Fragment>
        <ButtonTo id='sign-in-button' title={'SignIn'} to={'/sign-in'} className={['SignInOut__signInButton']}/>
        <div className="SignInOut__greeting">Sign in to be a <span className="SignInOut__greetingMsg">right guy</span></div>
      </Fragment>
    )}
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(SignInOut)