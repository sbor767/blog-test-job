import React from 'react'
import Rate from 'rc-rate'
import 'rc-rate/assets/index.css'
import cn from 'classnames'

import './style.css'


export default function RateComponent({ rates, userId, onChange, style }) {

  const average = () => {
    const length = Object.keys(rates).length
    if (!length) return 0
    return Object.keys(rates).reduce((acc, key) => acc + rates[key], 0) / length
  }

  const qty = () => Object.keys(rates).length

  const ownRate = () => !!rates[userId] ? rates[userId] : null


  return (
    <div className="RateComponent">
      <Rate
        className={cn('RateComponent__rc-rate', {'RateComponent__rc-rate-disabled': !userId})}
        disabled={!userId}
        value={average()}
        onChange={onChange}
        style={style}
        // allowHalf
      />
      <div className="RateComponent__average">
        {!!average() ? `${average().toFixed(1)} star by ${qty()} user(s)` : ''}
      </div>
      {!!userId ? (
        <div className="RateComponent__own">
          {!!ownRate() ? `Your rate is ${ownRate()}` : ''}
        </div>
      ) : null}
    </div>
  )
}