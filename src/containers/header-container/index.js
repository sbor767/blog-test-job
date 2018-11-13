import React, { Component } from 'react'

import LayoutHeader from '../../components/layouts/layout-header'
import Logo from '../../components/elements/logo'
import SignInOut from '../../components/sign-in-out'


export default class HeaderContainer extends Component {


  render() {
    return (
      <LayoutHeader
        left={<Logo/>}
        right={<SignInOut/>}
        center={}
      />
    );
  }
}