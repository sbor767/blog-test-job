import React from 'react'
import cn from 'classnames'

import './style.css'

export default function LayoutContentItems({ className, children }) {
  return (
    <div className={cn('LayoutContentItems', className)}>
      {children}
    </div>
  )
}