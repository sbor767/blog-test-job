import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../../../store/actions'
import { Copyright } from '../../..'
import PagesPostCommentInfo from '../comment-info'
import './style.css'


function PagesPostComment({ commentId, comments, users, user, dispatch }) {
  const comment = comments.items[commentId]
  const rates = comment.rates

  const handleRateOnChange = value => actions.comments.rate(commentId, user.id, !!rates[user.id], value)(dispatch)


  return (
    <div className="PagesPostComment">
      <div className="PagesPostComment__body">
        {comment.body}
      </div>
      <div className="PagesPostComment__infoWrapper">
        <PagesPostCommentInfo
          rates={rates}
          onChange={handleRateOnChange}
          userId={user.id}
        >
          <div className="PagesPostComment__copyright">
            <Copyright author={users.items[comment.authorId].name} timestamp={comment.timestamp}/>
          </div>
        </PagesPostCommentInfo>
      </div>
    </div>
  )
}


const mapStateToProps = state => ({
  comments: state.comments,
  users: state.users,
  user: state.user,
})

export default connect(mapStateToProps)(PagesPostComment)