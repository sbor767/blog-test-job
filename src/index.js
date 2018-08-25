import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './containers/app'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./containers/app', () => {
  // module.hot.accept(['./components/App', './controllers/RstApi'], () => {
  // module.hot.accept(['./components/App', './controllers'], () => {
    // @TODO Why need NextApp ??
    const NextApp = require('./containers/app').default
    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      document.getElementById('root')
    )
  })
}