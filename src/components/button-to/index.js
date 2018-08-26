import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

export default function ButtonTo({ title, to, classes = [] }) {
  return (
        <Link to={to}>
          <button className={`ButtonTo ${classes.join(' ')}`}>{title}</button>
        </Link>
  )
}