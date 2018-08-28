// 'use strict'

const express = require('express')
const app = express()
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const cors = require('cors')
const bodyParser = require('body-parser')

let datasource = require('./datasource')


const AUTH0_DOMAIN = 'blog-test-job.stripway.ru'
// @TODO Set up it!
const API_AUDIENCE_ATTRIBUTE = 'Some to be issued.'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    // YOUR-AUTH0-DOMAIN name e.g https://prosper.auth0.com
    // @TODO To be Refactored
    jwksUri: `${AUTH0_DOMAIN}//.well-known/jwks.json`
  }),
  // This is the identifier we set when we created the API
  audience: API_AUDIENCE_ATTRIBUTE,
  issuer: AUTH0_DOMAIN,
  algorithms: ['RS256']
})

app.get('/api/blog/posts', (req, res) => {
  let { posts } = datasource
  res.json(posts)
})


app.get('/api/blog/users', (req,res) => {
  let { users } = datasource
  res.json(users)
})

app.get('/api/blog/users-private', authCheck, (req,res) => {
  let { users } = datasource
  res.json(users);
})

app.get('/api/blog/comments', (req,res) => {
  let { comments } = datasource
  res.json(comments);
})


app.listen(3333);
console.log('Listening on localhost:3333');