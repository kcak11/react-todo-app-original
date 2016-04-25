import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';

import firebaseRef from 'database/firebase';
import actions from 'actions/index'
import {configure} from 'store/configureStore';
import routes from 'routes/index'

var store = configure();

// Load foundation
$(document).foundation();

// App css
// TODO - conver this to a separate css file
require('style!css!sass!applicationStyles');
require('style!css!sass!animate.css');

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
