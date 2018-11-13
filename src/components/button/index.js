import React from 'react'
import cn from 'classnames'

import './style.css'


export default function Button({ title, to = '', onClick, className }) {
  return (
    <button onClick={onClick} className={cn('Button', className)}>
      <div className='Button__buttonTitle'>
        <span className='Button__buttonTitleText'>
          {title}
        </span>
      </div>
    </button>
  )
}