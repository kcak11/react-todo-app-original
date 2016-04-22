import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

// My modules
import firebaseRef, {getUserRef} from 'firebaseRef';
import TodoApp from 'app/components/TodoApp';
import actions from 'app/actions/index'
import {configure} from 'app/store/configureStore';
import TodoAPI from 'app/api/TodoAPI';
import Signup from 'app/components/Signup';
import Login from 'app/components/Login';
import RequestReset from 'app/components/RequestReset';
import SetPassword from 'app/components/SetPassword';
import App from 'app/components/App';

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

var requireLogin = (nextState, replace, next) => {
  if (!firebaseRef.getAuth()) {
    console.log('Authentication required. Redirecting to /login');
    replace('/login');
  }
  next();
}

var redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebaseRef.getAuth()) {
    console.log('Already authenticated. Redirecting to /todos');
    replace('/todos');
  }
  next();
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="todos" component={TodoApp} onEnter={requireLogin}/>
        <Route path="login" component={Login} onEnter={redirectIfLoggedIn}/>
        <Route path="request-reset" component={RequestReset}/>
        <Route path="set-password" component={SetPassword}/>
        <IndexRoute component={Signup} onEnter={redirectIfLoggedIn}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
