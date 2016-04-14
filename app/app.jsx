var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var TodoApp = require('TodoApp');
var actions = require('actions');
var store = require('configureStore').configure();
var TodoAPI = require('TodoAPI');
import Signup from 'Signup';
import Login from 'Login';

store.subscribe(() => {
  var state = store.getState();
  // console.log('New state', state);
  TodoAPI.setTodos(state.todos);
});

// TODO - Create a priming action in app.jsx that also populates the login token
var initialTodos = TodoAPI.getTodos();
store.dispatch(actions.addTodos(initialTodos));

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

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
