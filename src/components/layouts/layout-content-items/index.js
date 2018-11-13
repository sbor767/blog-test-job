import React from 'react'
import cn from 'classnames'

import './style.css'


export default function LayoutContentItems({ className, contentHeader, contentFooter, children }) {


  return (
    <div className={cn('LayoutContentItems', className)}>
      {contentHeader}
      {children}
      {contentFooter}
    </div>
  )
}