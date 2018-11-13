import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import './style.css'

export default function ButtonTo({ title, to, className }) {
  return (
    <div className={cn('ButtonTo', className)}>
      <Link to={to} className={'ButtonTo__link'}>
        <button className={'ButtonTo__button'}><span className='ButtonTo__buttonTitle'>{title}</span></button>
      </Link>
    </div>
  )
}