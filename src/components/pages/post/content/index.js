import React from 'react'

import Copyright from '../../../copyright/index'
import './style.css'


export default function PagesPostContent({ body, author, timestamp }) {

  return (
    <div className='PagesPostContent'>
      <Copyright author={author} timestamp={timestamp}/>
      <div className="PagesPostContent__body">
        {body}
      </div>
    </div>
  )
}