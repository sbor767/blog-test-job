import React from 'react'
import { connect } from 'react-redux'

import './style.css'
import Copyright from '../../../components/copyright'
import RateComponent from '../../../components/rate-component'
import * as actions from '../../../store/actions'

function Comment({ commentId, comments, users, user, dispatch }) {
  const comment = comments.items[commentId]
  const rates = comment.rates

  const handleOnChange = value => actions.comments.rate(commentId, user.id, !!rates[user.id], value)(dispatch)

  return (
    <div className="Comment">
      <div className="Comment__body">
        {comment.body}
      </div>
      <div className="Comment__copyright">
        <Copyright author={users.items[comment.authorId].name} timestamp={comment.timestamp}/>
      </div>
      <RateComponent
        rates={rates}
        onChange={handleOnChange}
        userId={user.id}
        // style={{ fontSize: 10, marginTop: 4 }}
      />
    </div>
  )
}


const mapStateToProps = state => ({
  comments: state.comments,
  users: state.users,
  user: state.user,
})

export default connect(mapStateToProps)(Comment)