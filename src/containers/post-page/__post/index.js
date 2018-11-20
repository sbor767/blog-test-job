import React from 'react'

import Copyright from '../../../components/copyright'
import './style.css'


export default function __Post({ body, author, timestamp }) {
  return (
    <div className='__Post'>
      <Copyright author={author} timestamp={timestamp}/>
      <div className="__Post__body">
        {body}
      </div>
    </div>
  )
}