import React from 'react'
import { connect } from 'react-redux'
import Rate from 'rc-rate'

import * as actions from '../../../store/actions'
import './style.css'

function CommentRate({ commentId, user, comments, dispatch }) {

  const rates = comments.items[commentId].rates

  const average = () => {
    const length = Object.keys(rates).length
    if (!length) return 0
    return Object.keys(rates).reduce((acc, key) => acc + rates[key], 0) / length
  }

  const qty = () => Object.keys(rates).length

  const ownRate = () => !!rates[user.id] ? rates[user.id] : null

  const handleOnChange = value => actions.comments.rate(commentId, user.id, !!rates[user.id], value)(dispatch)


  return (
    <div className="Comment__CommentRate">
      <Rate
        value={average()}
        onChange={handleOnChange}
        style={{ fontSize: 10, marginTop: 4 }}
        allowHalf
        character={<i className="anticon anticon-star" />}
      />
      <div className="Comment__CommentRate__average">
        {!!average() ? `${average().toFixed(1)} star by ${qty()} user(s)` : ''}
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
  comments: state.comments
})

export default connect(mapStateToProps)(CommentRate)