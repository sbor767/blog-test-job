import React from 'react'
import cn from 'classnames'

import './style.css'

export default function LayoutPage({ className, children }) {
  return (
    <div className={cn('LayoutPage', className)}>
      {children}
    </div>
  )
}