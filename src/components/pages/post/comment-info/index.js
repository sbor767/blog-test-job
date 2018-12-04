import React from 'react'
import Rate from 'rc-rate'
import 'rc-rate/assets/index.css'
import cn from 'classnames'

import './style.css'


export default function PagesPostCommentInfo({ rates, userId, onChange, style, children }) {

  const average = () => {
    const length = Object.keys(rates).length
    if (!length) return 0
    return Object.keys(rates).reduce((acc, key) => acc + rates[key], 0) / length
  }

  const qty = () => Object.keys(rates).length

  const ownRate = () => !!rates[userId] ? rates[userId] : null


  return (
    <div className="PagesPostCommentInfo">
      <div className="PagesPostCommentInfo__left">
        {children}
      </div>
      <div className="PagesPostCommentInfo__centre">
        <Rate
          className={cn('PagesPostCommentInfo__rc-rate', {'PagesPostCommentInfo__rc-rate-disabled': !userId})}
          disabled={!userId}
          value={average()}
          onChange={onChange}
          style={style}
        />
        {!!average() && <div className="PagesPostCommentInfo__average">
          <span className="PagesPostCommentInfo__averageRate">{average().toFixed(1)}</span> star by <span className="PagesPostCommentInfo__averageQty">{qty()}</span> user(s)
        </div>}
      </div>
      <div className="PagesPostCommentInfo__right">
        {!!userId && !!ownRate() && <div className="PagesPostCommentInfo__ownRate">{`Your is ${ownRate()}`}</div>}
      </div>
    </div>
  )
}