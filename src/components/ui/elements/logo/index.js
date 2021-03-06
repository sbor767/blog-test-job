import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import { themes } from '../../../../utils/index'
import './style.css'


export default class Logo extends Component {

  static propTypes = {
    to: PropTypes.string,
    title: PropTypes.string,
    theme: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
  }

  static defaultProps = {
    to: '/',
    title: '',
    theme: ''
  }

  render() {
    const {to, theme, title} = this.props
    return (


      <Link className={cn(`Logo`, themes('Logo', theme))} to={to} title={title}>
        <img src='/assets/react-icon.svg' alt='logo' className="Logo__img" />
      </Link>
    )
  }
}