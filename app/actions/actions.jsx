import firebaseRef, {getUserRef} from 'firebaseRef';
import {hashHistory} from 'react-router'
import moment from 'moment';
import _ from 'lodash';
import {reset} from 'redux-form';

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

export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  };
};

export var updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates
  };
};

export var login = (token, uid) => {
  return {
    type: 'LOGIN',
    token,
    uid
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export var showFlashMessage = (message, messageType = 'alert') => {
  return {
    type: 'SHOW_FLASH_MESSAGE',
    message,
    messageType
  }
};

export var clearFlashMessage = () => {
  return {
    type: 'CLEAR_FLASH_MESSAGE'
  }
};

// Async action to create users
export var createUser = (email = '', password = '') => {
  return (dispatch, getState) => {
    return firebaseRef.createUser({
      email,
      password
    }).then(() => {
      dispatch(showFlashMessage('Account created!', 'success'));
      dispatch(reset('signup'));
      hashHistory.push('/login');
      return Promise.resolve();
    }, (e) => {
      dispatch(showFlashMessage(e.message, 'error'));
      return Promise.reject();
    });
  };
};

// Async action to start the login process
export var startLogin = (email = '', password = '') => {
  return (dispatch, getState) => {
    return firebaseRef.authWithPassword({
      email,
      password
    }).then((authData) => {
      dispatch(login(authData.token, authData.uid));
      dispatch(populateTodos());
      hashHistory.push('/todos');

      if (authData.password.isTemporaryPassword) {
        dispatch(showFlashMessage('Please set a new password in account settings.', 'success'));
      }

      return Promise.resolve();
    }, (e) => {
      dispatch(reset('login'));
      dispatch(showFlashMessage(e.message, 'error'));
      return Promise.reject();
    });
  }
};

// Async action for kicking off logout process
export var startLogout = () => {
  return (dispatch, getState) => {
    return firebaseRef.unauth().then(function () {
      dispatch(logout());
      hashHistory.push('/login');
      return Promise.resolve();
    }, (error) => {
      return Promise.reject();
    });
  }
};

// Async action for requesting a reset
export var requestReset = (email = '') => {
  return (dispatch, getState) => {
    return firebaseRef.resetPassword({email}).then(() => {
      dispatch(showFlashMessage('We sent an email with reset instructions.', 'success'));
      hashHistory.push('/login');
    }, (e) => {
      dispatch(showFlashMessage(e.message, 'error'));
    });
  };
};

// Async action for creating a new todo item
export var createTodo = (text) => {
  return (dispatch, getState) => {
    var uid = getState().user.uid;
    var todosRef = getUserRef(uid).child('todos');
    var todo = {
      text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null
    };
    var todoRef =  todosRef.push(todo, function (err) {
      dispatch(addTodo({
        ...todo,
        id: todoRef.key()
      }));
    });

    return todoRef;
  }
};

// Async action for setting new password
export var changePassword = (opts = {}) => {
  return (dispatch, getState) => {
    return firebaseRef.changePassword(opts).then(() => {
      dispatch(showFlashMessage('Password reset!', 'success'));
      hashHistory.push('/todos');
      return Promise.resolve();
    }, (error) => {
      dispatch(showFlashMessage(error.message, 'error'));
      return Promise.reject();
    })
  }
};

export var populateTodos = () => {
  return (dispatch, getState) => {
    var uid = getState().user.uid;
    var todosRef = getUserRef(uid).child('todos');

    todosRef.once('value', (snapshot) => {
      var val = snapshot.val();

      if (!val) {
        return;
      }

      var todos = Object.keys(val).map((key) => {
        dispatch(addTodo({
          ...val[key],
          id: key
        }));
      });
    });
  }
};

export var toggleTodo = (id) => {
  return (dispatch, getState) => {
    var uid = getState().user.uid;
    var todoRef = getUserRef(uid).child(`todos/${id}`);
    var updates;

    todoRef.once('value').then((snapshot) => {
      var newCompleted = !snapshot.val().completed;
      updates = {
        completed: newCompleted,
        completedAt: newCompleted ? moment().unix() : null
      };

      return todoRef.update(updates)
    }).then(() => {
      dispatch(updateTodo(id, updates));
    });
  };
};
