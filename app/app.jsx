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

// store.subscribe(() => {
//   var state = store.getState();
// });

// TODO - ON ROUTE CHANGES, THIS DOESN'T FIX ISSUE. YOU CAN STILL SWITCH TO TODOS WITHOUT GETTING REDIRECTED
// Can i make specific components private & others public?
firebaseRef.onAuth((authData) => {
  if (authData) {
    console.log('logged in');
    hashHistory.push('/todos');
  } else if (window.location.hash.indexOf('#/todos') === 0) {
    hashHistory.push('/login');
  }
});

// Check if there is already an id ready to go
if (store.getState().login.uid) {
  store.dispatch(actions.populateTodos());
}

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/">
        <Route path="todos" component={TodoApp}/>
        <Route path="login" component={Login}/>
        <IndexRoute component={Signup}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
