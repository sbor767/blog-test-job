/**
 * See https://stackoverflow.com/a/49439893.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import cn from 'classnames'

import { themes } from '../../utils'
import './style.css'

class ButtonLink extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,

    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string,
    title: PropTypes.string,
    theme: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    disabled: PropTypes.bool
  }

  static defaultProps = {
    type: 'button',
    disabled: false,
    theme: '',
  }

  onClick = (e) => {
    const { history, onClick, to } = this.props
    if (onClick) {
      e.preventDefault()
      onClick(e)
    }
    history.push(to)
  }

  render() {
    const { theme, title, type, children, disabled } = this.props
    return (
      <button
        type={type}
        className={cn(`ButtonLink`, themes('ButtonLink', theme))}
        title={title}
        onClick={this.onClick}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }
}

export default withRouter(ButtonLink)