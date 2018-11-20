import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import LayoutHeader from '../layouts/layout-header'
import SignInOut from '../sign-in-out'
import { Logo } from '../elements'
import './style.css'


export default class Header extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  }


  render() {
    const { title, className } = this.props

    return (
      <LayoutHeader
        left={<Logo/>}
        center={(<h1>{title}</h1>)}
        right={<SignInOut/>}
        className={cn('Header', className)}
      />
    )
  }
}