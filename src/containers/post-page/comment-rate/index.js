import React from 'react'
import Rate from 'rc-rate'

import './style.css'

export default function CommentRate({ rates, userId, onChange, style }) {

  const average = () => {
    const length = Object.keys(rates).length
    if (!length) return 0
    return Object.keys(rates).reduce((acc, key) => acc + rates[key], 0) / length
  }

  const qty = () => Object.keys(rates).length

  const ownRate = () => !!rates[userId] ? rates[userId] : null


  return (
    <div className="Comment__CommentRate">
      <Rate
        value={average()}
        onChange={onChange}
        style={style}
        allowHalf
        character={<i className="anticon anticon-star" />}
      />
      <div className="Comment__CommentRate__average">
        {!!average() ? `${average().toFixed(1)} star by ${qty()} user(s)` : ''}
      </div>
      {!!userId ? (
        <div className="Comment__CommentRate__own">
          {!!ownRate() ? `Your rate is ${ownRate()}` : ''}
        </div>
      ) : ''}
    </div>
  )
}