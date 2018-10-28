import React from 'react'
import { connect } from 'react-redux'
import Rate from 'rc-rate'

import './style.css'
import './style.less'
import Copyright from '../../../components/copyright'

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
      <Rate
        defaultValue={2.5}
        onChange={() => {}}
        style={{ fontSize: 10, marginTop: 14 }}
        allowHalf
        character={<i className="anticon anticon-star" />}
      />
    </div>
  )
}


const mapStateToProps = state => ({
  comments: state.comments,
  users: state.users
})

export default connect(mapStateToProps)(Comment)