import {comments, posts, user} from '../../api/rest-like'

const init = () => (
    user: 1,
  users
)

function getData() {
  return Promise.all([
    user.get(),
    users.get(),
    posts.get(),
    comments.get()
  ])
}

/*
	  getData()
      .then(values => this.setState({
        user: values[0],
        users:values[1],
        posts: values[2],
        comments: values[3],
        isLoaded: true,
        error: ''
      }))
      .catch(error => {
        console.log('Api get test data error: ', error)
        this.setState({
          user: {},
          users: [],
          posts: [],
          comments: [],
          isLoaded: false,
          error
        })
      })
*/
