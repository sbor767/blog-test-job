import React from 'react'

import './style.css'

export default function Header({ title, children }) {
  return (
    <div id='HeaderContainer'>
      <img src='/assets/icon.png' alt='logo' />
      <h1>{title}</h1>
      {children}
    </div>
  )
}