import React from 'react'
import { connect } from 'react-redux'

import './style.css'
import Copyright from '../../../components/copyright'
import CommentRate from '../comment-rate'

function Comment({ commentId, comments, users }) {
  const comment = comments.items[commentId]

  return (
    <div className="Comment">
      <div className="Comment__body">
        {comment.body}
      </div>
      <div className="Comment__copyright">
        <Copyright author={users.items[comment.authorId].name} timestamp={comment.timestamp}/>
      </div>
      <CommentRate
        rates={comment.rates}
      />
    </div>
  )
}


const mapStateToProps = state => ({
  comments: state.comments,
  users: state.users
})

export default connect(mapStateToProps)(Comment)