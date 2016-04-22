import * as redux from 'redux'
import thunk from 'redux-thunk';
import reducer from 'reducers/index';

export var configure = (initialState = {}) => {

  const logger = store => next => action => {
    var result;

    if (typeof action === 'function') {
      result = action(store.dispatch, store.getState)
    } else {
      result = next(action)
    }

    localStorage.setItem('login', JSON.stringify(
      store.getState().user
    ));

    return result
  }


  try {
    let rawLogin = localStorage.getItem('login');

    if (rawLogin) {
      initialState.user = JSON.parse(rawLogin);
    } else {
      throw new Error();
    }
  } catch (e) {
    initialState.user = {};
  }


  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(logger),
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
