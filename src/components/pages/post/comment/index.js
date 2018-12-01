import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../../../store/actions'
import { Copyright, RateComponent } from '../../..'
import './style.css'


function PagesPostComment({ commentId, comments, users, user, dispatch }) {
  const comment = comments.items[commentId]
  const rates = comment.rates

  const handleOnChange = value => actions.comments.rate(commentId, user.id, !!rates[user.id], value)(dispatch)


  return (
    <div className="PagesPostComment">
      <div className="PagesPostComment__body">
        {comment.body}
      </div>
      <div className="PagesPostComment__copyright">
        <Copyright author={users.items[comment.authorId].name} timestamp={comment.timestamp} />
      </div>
      <RateComponent
        rates={rates}
        onChange={handleOnChange}
        userId={user.id}
      />
    </div>
  )
}


const mapStateToProps = state => ({
  comments: state.comments,
  users: state.users,
  user: state.user,
})

export default connect(mapStateToProps)(PagesPostComment)