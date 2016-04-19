import firebaseRef, {getUserRef} from 'firebaseRef';
import {hashHistory} from 'react-router'
import moment from 'moment';
import _ from 'lodash';

export var changeSignup = (updates) => {
  return {
    type: 'CHANGE_SIGNUP',
    ..._.pick(updates, ['isLoading', 'email', 'password'])
  };
};

export var resetSignup = () => {
  return {type: 'RESET_SIGNUP'};
};

export var changeLogin = (updates) => {
  return {
    type: 'CHANGE_LOGIN',
    ..._.pick(updates, ['isLoading', 'email', 'password'])
  };
};

export var resetLogin = () => {
  return {type: 'RESET_LOGIN'};
};

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

//

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

// TODO - How can I test that the proper action gets dispatched?
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

    var todoRef = todosRef.push(todo, (err) => {
      dispatch(addTodo({
        ...todo,
        id: todoRef.key()
      }));
    });
  }
};

export var populateTodos = (todos) => {
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

export var createUser = (email = '', password = '') => {
  return (dispatch, getState) => {
    dispatch(changeSignup({isLoading: true}));
    return firebaseRef.createUser({
      email,
      password
    }).then(() => {
      dispatch(showFlashMessage('Account created!', 'success'));
      dispatch(changeSignup({isLoading: false}));
      hashHistory.push('/login');
    }, (e) => {
      dispatch(showFlashMessage(e.message, 'error'));
      dispatch(changeSignup({isLoading: false}));
    });
  };
};


export var startLogin = (email = '', password = '') => {
  return (dispatch, getState) => {
    dispatch(changeLogin({isLoading: true}));
    return firebaseRef.authWithPassword({
      email,
      password
    }).then((authData) => {
      dispatch(login(authData.token, authData.uid));
      dispatch(populateTodos());
      dispatch(changeLogin({isLoading: false}));

      if (authData.password.isTemporaryPassword) {
        hashHistory.push('/set-password');
        dispatch(showFlashMessage('Please set a new password', 'success'));
      } else {
        hashHistory.push('/todos');
      }
    }, (e) => {
      dispatch(resetLogin());
      dispatch(showFlashMessage(e.message, 'error'));
    });
  }
};

// handleSubmit: function (e) {
//     var {dispatch} = this.props;
//
//     e.preventDefault();
//
//     this.setState({isLoading: true});
//     dispatch(actions.startLogin(this.refs.email.value, this.refs.password.value)).then((isTemporaryPassword) => {
//       this.setState({isLoading: false});
//       if (isTemporaryPassword) {
//         hashHistory.push('/set-password');
//         dispatch(actions.showFlashMessage('Please set a new password', 'success'));
//       } else {
//         hashHistory.push('/todos');
//       }
//     }, (e) => {
//       this.setState({password: undefined, isLoading: false});
//       dispatch(actions.showFlashMessage(e.message, 'error'));
//
//     })
// },

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebaseRef.unauth().then(function () {
      dispatch(logout());
      return;
    }, (error) => {
      throw new Error(error.message);
    });
  }
};

export var requestReset = (email = '') => {
  return (dispatch, getState) => {
    return firebaseRef.resetPassword({email});
  }
};

export var changePassword = (opts = {}) => {
  return (dispatch, getState) => {
    return firebaseRef.changePassword(opts);
  }
};
