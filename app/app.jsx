import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';

import actions from 'actions/index'
import {configure} from 'store/configureStore';
import routes from 'routes/index'

var store = configure();

// Check if there is already an id ready to go
if (store.getState().user.uid) {
  store.dispatch(actions.populateTodos());
}

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
