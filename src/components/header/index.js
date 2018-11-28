import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { LayoutHeader } from '../ui/layouts'
import { Logo } from '../ui/elements'
import { SignInOut } from '../'
import './style.css'


export default class Header extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    inSignPage: PropTypes.bool
  }

  static defaultProps = {
    inSignPage: false
  }


  render() {
    const { title, inSignPage, className } = this.props

    return (
      <LayoutHeader
        left={<Logo/>}
        center={(<h1>{title}</h1>)}
        right={<SignInOut inSignPage={inSignPage} />}
        className={cn('Header', className)}
      />
    )
  }
}