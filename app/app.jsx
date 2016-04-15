var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

import firebaseRef, {getUserRef} from 'firebaseRef';
var TodoApp = require('TodoApp');
var actions = require('actions');
var store = require('configureStore').configure();
var TodoAPI = require('TodoAPI');
import Signup from 'Signup';
import Login from 'Login';

// Check if there is already an id ready to go
if (store.getState().login.uid) {
  store.dispatch(actions.populateTodos());
}

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles');

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
      <Route path="/">
        <Route path="todos" component={TodoApp} onEnter={requireLogin}/>
        <Route path="login" component={Login} onEnter={redirectIfLoggedIn}/>
        <IndexRoute component={Signup} onEnter={redirectIfLoggedIn}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
