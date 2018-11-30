import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from "classnames"

import { themes } from "../../../../utils/index"
import './style.css'


export default class LayoutHeader extends Component {

  static propTypes = {
    left: PropTypes.node,
    right: PropTypes.node,
    center: PropTypes.node,
    children: PropTypes.node,
    theme: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
  }

  static defaultProps = {
    theme: ''
  }


  render() {
    const {left, right, center, children, theme, className} = this.props

    return (
      <div  className={cn('LayoutHeader', className, themes('LayoutHeader', theme))}>
        <div className="LayoutHeader__wrap">
          <div className="LayoutHeader__left">
            {left}
          </div>
          <div className="LayoutHeader__center">
              {children||center}
          </div>
          <div className="LayoutHeader__right">
            {right}
          </div>
        </div>
      </div>
    )
  }
}