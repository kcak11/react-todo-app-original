import firebaseRef, {getUserRef} from 'firebaseRef';
import {hashHistory} from 'react-router'
import moment from 'moment';
import {reset} from 'redux-form';

import * as actions from 'app/actions/action-generators';

// Async action to create users
export var createUser = (email = '', password = '') => {
  return (dispatch, getState) => {
    return firebaseRef.createUser({
      email,
      password
    }).then(() => {
      dispatch(actions.showFlashMessage('Account created!', 'success'));
      hashHistory.push('/login');
    }, (e) => {
      dispatch(actions.showFlashMessage(e.message, 'error'));
      throw e;
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
      dispatch(actions.login(authData.token, authData.uid));
      hashHistory.push('/todos');

      if (authData.password.isTemporaryPassword) {
        dispatch(actions.showFlashMessage('Please set a new password in account settings.', 'success'));
      }
    }, (e) => {
      dispatch(reset('login'));
      dispatch(actions.showFlashMessage(e.message, 'error'));
      throw e;
    });
  }
};

// Async action for kicking off logout process
export var startLogout = () => {
  return (dispatch, getState) => {
    return firebaseRef.unauth().then(function () {
      dispatch(actions.logout());
      hashHistory.push('/login');
    });
  }
};

// Async action for requesting a reset
export var requestReset = (email = '') => {
  return (dispatch, getState) => {
    return firebaseRef.resetPassword({email}).then(() => {
      dispatch(actions.showFlashMessage('We sent an email with reset instructions.', 'success'));
      hashHistory.push('/login');
    }, (e) => {
      dispatch(actions.showFlashMessage(e.message, 'error'));
      throw e;
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
    var todoRef =  todosRef.push(todo)

    return todoRef.then(() => {
      dispatch(actions.addTodo({
        ...todo,
        id: todoRef.key()
      }));
    });
  }
};

// Async action for setting new password
export var changePassword = (opts = {}) => {
  return (dispatch, getState) => {
    return firebaseRef.changePassword(opts).then(() => {
      dispatch(actions.showFlashMessage('Password reset!', 'success'));
      hashHistory.push('/todos');
    }, (error) => {
      dispatch(actions.showFlashMessage(error.message, 'error'));
      throw e;
    })
  }
};

export var populateTodos = () => {
  return (dispatch, getState) => {
    var uid = getState().user.uid;
    var todosRef = getUserRef(uid);

    return todosRef.once('value', (snapshot) => {
      var val = snapshot.val();
      var todos = val.todos || [];

      Object.keys(todos).map((key) => {
        dispatch(actions.addTodo({
          ...todos[key],
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

    return todoRef.once('value').then((snapshot) => {
      var newCompleted = !snapshot.val().completed;
      updates = {
        completed: newCompleted,
        completedAt: newCompleted ? moment().unix() : null
      };

      return todoRef.update(updates)
    }).then(() => {
      dispatch(actions.updateTodo(id, updates));
    });
  };
};
