import React from 'react'
import cn from 'classnames'

import './style.css'

export default function LayoutCentreWrapper({ className, children }) {
  return (
    <div className={cn('LayoutCentreWrapper', className)}>
      {children}
    </div>
  )
}