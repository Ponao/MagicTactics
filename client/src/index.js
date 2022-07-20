import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import reportWebVitals from './reportWebVitals'

import store from './store'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
} from "react-router-dom"

import './assets/styles/global.css'
import './assets/styles/bootstrap.css'
import './assets/fonts/index.css'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals()
