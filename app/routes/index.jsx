import React from 'react';
import {Route, IndexRoute} from 'react-router';

import firebaseRef, {getUserRef} from 'database/firebase';
import Signup from 'components/Signup';
import Login from 'components/Login';
import RequestReset from 'components/RequestReset';
import SetPassword from 'components/SetPassword';
import App from 'components/App';
import TodoApp from 'components/TodoApp';

export var requireLogin = (nextState, replace, next) => {
  if (!firebaseRef.getAuth()) {
    replace('/login');
  }
  next();
};

export var redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebaseRef.getAuth()) {
    replace('/todos');
  }
  next();
};

export default (
  <Route path="/" component={App}>
    <Route path="todos" component={TodoApp} onEnter={requireLogin}/>
    <Route path="login" component={Login} onEnter={redirectIfLoggedIn}/>
    <Route path="request-reset" component={RequestReset}/>
    <Route path="set-password" component={SetPassword}/>
    <IndexRoute component={Signup} onEnter={redirectIfLoggedIn}/>
  </Route>
);
