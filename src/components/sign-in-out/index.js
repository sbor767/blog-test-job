import React from 'react'

import './style.css'
import Button from '../button'
import ButtonTo from '../button-to'

export default function SignInOut({ user, onSignOut, children }) {
  return (
    <div className="SignInOut">
    {!!user.id ? (
      <div className="SignInOut_wrap">
        <div className="SignInOut_buttons">
          {children}
          <Button title={'SignOut'} onClick={onSignOut} classes={['blue']}/>
        </div>
        <div className="SignInOut_welcome"><p>Welcome <span className="SignInOut_welcome_name">{user.name}</span></p></div>
      </div>
    ) : (
      <div className="SignInOut_wrap">
        <ButtonTo title={'SignIn'} to={'/sign-in'} classes={['blue', 'ButtonTo_float_right', 'clearfix']}/>
        <div className="SignInOut_welcome"><p>Sign in to be <span className="SignInOut_welcome_name">right guy</span></p></div>
      </div>
    )}
    </div>
  )
}