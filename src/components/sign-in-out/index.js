import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../store/actions.js'
import Button from '../button'
import ButtonLink from '../button-link'
import './style.css'

function SignInOut({ user, dispatch }) {

  const signOut = () => actions.user.signOut()(dispatch)

  const markup = type => (
    <div className={`SignInOut__buttonDisc SignInOut__button${type}Disc`}>
      <span className='SignInOut__buttonText'>
        {`Sign${type}`}
      </span>
    </div>
  )

  return (
    <div className="SignInOut">
    {!!user.id ? (
      <Fragment>
        <Button onClick={signOut} className='SignInOut__signOutButton'>
          {markup('Out')}
        </Button>
        <div className="SignInOut__greeting">Welcome <span className="SignInOut__greetingName">{user.name}</span></div>
      </Fragment>
    ) : (
      <Fragment>
        <ButtonLink to={'/sign-in'} className='SignInOut__signInButton'>
          {markup('In')}
        </ButtonLink>
        <div className="SignInOut__greeting">Sign in to be a <span className="SignInOut__greetingAccent">right</span> guy</div>
      </Fragment>
    )}
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(SignInOut)