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


const routes = {
  path: '/',
  indexRoute: {
    getComponents (nextState, callback) {
      if (store.getState().login.token) {
        return hashHistory.push('/todos');
      }

      callback(null, Signup);
    }
  },
  childRoutes: [{
    path: 'todos',
    getComponents (nextState, callback) {
      if (!store.getState().login.token) {
        return hashHistory.push('/login');
      }

      callback(null, TodoApp);
    }
  }, {
    path: 'login',
    getComponents (nextState, callback) {
      if (store.getState().login.token) {
        return hashHistory.push('/todos');
      }

      callback(null, Login);
    }
  }]
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes}/>
  </Provider>,
  document.getElementById('app')
);
