import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './style.css'


export default class LayoutPage extends Component {

  static propTypes = {
    header: PropTypes.node,
    content: PropTypes.node,
    footer: PropTypes.node,
    children: PropTypes.node,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
  }


  render() {
    const { header, content, footer, children, className } = this.props
    return (
      <div className={cn('LayoutPage', className)}>
        <div className="LayoutPage__header">
          {header}
        </div>
        <div className="LayoutPage__content">
          {children || content}
        </div>
        <div className="LayoutPage__footer">
          {footer}
        </div>
      </div>
    )
  }
}