import React from 'react'

import Copyright from '../../../components/copyright'
import './style.css'


export default function Post({ body, author, timestamp }) {
  return (
    <div className='Post'>
      <Copyright author={author} timestamp={timestamp}/>
      <div className="Post__body">
        {body}
      </div>
    </div>
  )
}