import React from 'react'
import cn from 'classnames'

import './style.css'

export default function LayoutRoot({ className, children }) {
  return (
    <div className={cn('LayoutRoot', className)}>
      {children}
    </div>
  )
}