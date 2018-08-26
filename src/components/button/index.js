import React from 'react'

import './style.css'

export default function Button({ title, to = '', onClick, classes = []}) {
  return (
    <button onClick={onClick} className={`Button ${classes.join(' ')}`}>{title}</button>
  )
}