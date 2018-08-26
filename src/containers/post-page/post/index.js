import React from 'react'
import { Link } from 'react-router-dom'

import Header from '../../../components/header/index'
import './style.css'
import ButtonTo from '../../../components/button-to'
import Copyright from '../../../components/copyright'

export default function Post({ postId, title, body, author, timestamp }) {
  return (
    <div id="MessageContainer" className="Post inner-container">
      <div id="message-container">
        <Copyright author={author} timestamp={timestamp}/>
        <div className="Post__body">
          <p>{body}</p>
        </div>
      </div>
    </div>
  )
}