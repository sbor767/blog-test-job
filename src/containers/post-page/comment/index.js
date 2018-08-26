import React from 'react'
import Rate from 'rc-rate'

import './style.css'
import './style.less'
import Copyright from '../../../components/copyright'

export default function Comment({ id, comment, getAuthor, onRateChange }) {
  return (
    <div className="Comment">
      <div className="Comment__body">
        {comment.body}
      </div>
      <div className="Comment__copyright">
        <Copyright author={getAuthor(comment.author)} timestamp={comment.timestamp}/>
      </div>
      <Rate
        defaultValue={2.5}
        onChange={onRateChange}
        style={{ fontSize: 10, marginTop: 14 }}
        allowHalf
        character={<i className="anticon anticon-star" />}
      />
    </div>
  )
}