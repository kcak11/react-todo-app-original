import firebaseRef from 'firebaseRef';

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};

export var addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text
  };
};

export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos
  };
};

export var toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};

export var createUser = (email = '', password = '') => {
  return firebaseRef.createUser({
    email,
    password
  }).then((userData) => {
    return;
  }, (error) => {
    throw new Error(error.message);
  });
};

export var loginUser = (email = '', password = '') => {
  return (dispatch, getState) => {
    firebaseRef.authWithPassword({
      email,
      password
    }, function(error, authData) {
      if (!error) {
        // success
        dispatch({
          type: 'LOGIN_SUCCESS',
          token: authData.token,
          uid: authData.uid
        });
        window.location.hash = 'todos'
      } else {
        // error
        dispatch({
          type: 'LOGIN_ERROR',
          errorMessage: error.message
        });
      }
    });
  }
};

export var logoutUser = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'LOGOUT'
    });
    window.location.hash = ''
  }
};
