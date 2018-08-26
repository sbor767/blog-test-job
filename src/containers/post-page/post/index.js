import React from 'react'
import { Link } from 'react-router-dom'

import Header from '../../../components/header/index'
import './style.css'
import ButtonTo from '../../../components/button-to'
import Copyright from '../../../components/copyright'

export default function Post({ postId, title, body, author, timestamp }) {
  return (
    <div id="MessageContainer" className="Post inner-container">
      <Header title={title}>
{/*
        <Link to="/">
          <button className="blue">Back To Home</button>
        </Link>
*/}
        <ButtonTo title="Back to Home" to={"/"} classes={['blue']}/>
        {/*<button className="red">Delete</button>*/}
      </Header>
      <div id="message-container">
        <Copyright author={author} timestamp={timestamp}/>
        <div className="Post__body">
          <p>{body}</p>
        </div>
      </div>
    </div>
  )
}