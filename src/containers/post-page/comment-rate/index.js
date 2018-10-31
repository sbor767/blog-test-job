import React from 'react'
import { connect } from 'react-redux'
import Rate from 'rc-rate'

import './style.css'

function CommentRate({ user, rates }) {

  const average = () => {
    const length = Object.keys(rates).length
    if (!length) return 0
    return Object.keys(rates).reduce((acc, key) => acc + rates[key], 0) / length
  }

  const qty = () => Object.keys(rates).length

  const ownRate = () => !!rates[user.id] ? rates[user.id] : null

  return (
    <div className="Comment__CommentRate">
      <Rate
        defaultValue={average()}
        onChange={() => {}}
        style={{ fontSize: 10, marginTop: 14 }}
        allowHalf
        character={<i className="anticon anticon-star" />}
      />
      <div className="Comment__CommentRate__average">
        {!!average() ? `${average()} star by ${qty()} user(s)` : ''}
      </div>
      {!!user.id ? (
        <div className="Comment__CommentRate__own">
          {!!ownRate() ? `Your rate is ${ownRate()}` : ''}
        </div>
      ) : ''}
    </div>
  )
}


const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(CommentRate)