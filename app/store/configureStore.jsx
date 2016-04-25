import * as redux from 'redux'
import thunk from 'redux-thunk';
import reducer from 'reducers/index';

export var loggerMiddleware = store => next => action => {
  console.log('Dispatch action', action);
  let result = next(action);
  console.log('Next state', store.getState());
  return result
}

export var authInitialState = (initialState) => {
  var newInitialState = {...initialState};

  newInitialState.user = {};

  try {
    let rawLogin = localStorage.getItem('login');

    if (rawLogin) {
      newInitialState.user = JSON.parse(rawLogin);
    }
  } catch (e) {}

  return newInitialState
};

export var authMiddleware = store => next => action => {
  var result;

  if (typeof action === 'function') {
    result = action(store.dispatch, store.getState);
  } else {
    result = next(action)
  }

  localStorage.setItem('login', JSON.stringify(
    store.getState().user
  ));

  return result;
};

export var configure = (initialState = {}) => {
  initialState = authInitialState(initialState);

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(loggerMiddleware),
    redux.applyMiddleware(authMiddleware),
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
