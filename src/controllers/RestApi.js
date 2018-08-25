const REST_API_HOST = process.env.REST_API_URL || 'http://forum-test-job.stripway.ru'
const REST_API_PORT = process.env.REST_API_PORT || '4911'
const REST_API_PATH = process.env.REST_API_PATH || 'api/v1.0/messages/'
const REST_API_URL = REST_API_HOST + ':' + REST_API_PORT + '/' + REST_API_PATH

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    // return Promise.reject(new Error(`Code=${response.status} ${response.statusText}`))
    return Promise.reject(new Error(`Code=${response.status} ${response.statusText} RESPONSE=${response.json()}`))
  }
}

function json(response) {
  return response.json()
}

// POST query
function post(message) {
  return fetch(REST_API_URL, {
    method: 'POST',
    headers: {"Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(message)
  })
    .then(status)
    .then(json)
}

// GET query
function get(url) {
  return fetch(url)
    .then(status)
    .then(json)
  /*
      .then(function(data) {
        console.log('Request succeeded with JSON response', data)
      }).catch(function(error) {
      console.log('Request failed', error)
    })
  */
}

// DELETE query
function del(id) {
  return fetch(REST_API_URL + id, {
    method: 'DELETE'
  })
    .then(status)
    // .then(json)
    .then(response => {
      if (response.status === 204) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(new Error(`Code=${response.status} ${response.statusText} RESPONSE=${response.json()}`))
      }
    })
}

// PUT query
function put(message, id) {
  return fetch(REST_API_URL + id, {
    method: 'PUT',
    headers: {"Content-type": "application/json; charset=UTF-8"},
    body: JSON.stringify(message)
  })
    .then(status)
    .then(json)
}

module.exports.create = (message) => post(message)
module.exports.getList = () => get(REST_API_URL)
module.exports.getOneBody = (id) => get(REST_API_URL + id)
module.exports.delete = (id) => del(id)
module.exports.updateOne = (message, id) => put(message, id)

module.exports.getBlogPostsTest = () => Promise.resolve([
  {
    id: 1,
    title: "Amazing Thirst Thing",
    author: 1,
    timestamp:"2018-05-17 18:31:12",
    body:"Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.",
  },
  {
    id: 2,
    title: "Amazing Second Thing",
    author: 2,
    timestamp:"2018-07-27 10:11:28",
    body:"Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.",
  },
  {
    id: 3,
    title: "Amazing Third Thing",
    author: 3,
    timestamp:"2018-07-28 8:14:13",
    body:"Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.",
  },
  {
    id: 4,
    title: "Amazing New Thing",
    author: 1,
    timestamp:"2018-07-28 10:45:33",
    body:"Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.",
  },
])

module.exports.getUsersTest = () => Promise.resolve([
  {
    id: 1,
    name: 'John N.'
  },
  {
    id: 2,
    name: 'Alexandr M.'
  },
  {
    id: 3,
    name: 'Leonardo D.'
  }
  ])

module.exports.getCommentsTest = () => Promise.resolve([
  {
    id: 1,
    author: 1,
    timestamp: "2018-05-17 18:31:12",
    post: 1,
    body:"Very amazing thing. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.",
  },
  {
    id: 2,
    author: 2,
    timestamp:"2018-06-28 7:15:10",
    post: 2,
    body:"Some some some thing about it. Lorem ipsum ipsum ipsum now such.",
  },
  {
    id: 3,
    author: 1,
    timestamp:"2018-07-01 19:39:01",
    post: 1,
    body:"Very amazing thing.",
  },
  {
    id: 4,
    author: 3,
    timestamp:"2018-07-17 15:16:56",
    post: 4,
    body:"Wrong way. Do not do it!",
  },
  {
    id: 5,
    author: 1,
    timestamp:"2018-07-19 10:00:05",
    post: 4,
    body:"Call to service center.",
  },
  {
    id: 6,
    author: 2,
    timestamp:"2018-07-20 15:22:16",
    post: 1,
    body:"Up and down please. Make it now.",
  },
  {
    id: 7,
    author: 2,
    timestamp:"2018-07-20 15:26:44",
    post: 2,
    body:"Something interesting. Something interesting. Something interesting. Something interesting. Something interesting. Something interesting. Something interesting. Something interesting.",
  },
  {
    id: 8,
    author: 3,
    timestamp:"2018-07-20 12:45:07",
    post: 4,
    body:"Very amazing thing. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.",
  },
  {
    id: 9,
    author: 1,
    timestamp:"2018-07-21 09:05:07",
    post: 1,
    body:"Very amazing thing. Lorem ipsum ipsum ipsum now such. Lorem ipsum ipsum ipsum now such.",
  },
])
