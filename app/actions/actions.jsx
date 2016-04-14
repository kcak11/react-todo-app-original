import firebaseRef, {getUserRef} from 'firebaseRef';
import moment from 'moment';

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
  return (dispatch, getState) => {
    var uid = getState().login.uid;
    var todosRef = getUserRef(uid).child('todos');
    var todo = {
      text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null
    };

    var todoRef = todosRef.push(todo, (err) => {
      dispatch({
        type: 'ADD_TODO',
        todo: {
          ...todo,
          id: todoRef.key()
        }
      });
    });
  }
};

export var populateTodos = (todos) => {
  return (dispatch, getState) => {
    var uid = getState().login.uid;
    var todosRef = getUserRef(uid).child('todos');

    todosRef.on('child_added', (snapshot) => {
      dispatch({
        type: 'ADD_TODO',
        todo: {
          ...snapshot.val(),
          id: snapshot.key()
        }
      });
    }, (error) => {
      // console.log('Error', error);
    });
  }
};

export var toggleTodo = (id) => {
  return (dispatch, getState) => {
    var uid = getState().login.uid;
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
      dispatch({
        type: 'UPDATE_TODO',
        id,
        updates
      });
    });
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
    return firebaseRef.authWithPassword({
      email,
      password
    }).then((authData) => {
      dispatch({
        type: 'LOGIN_SUCCESS',
        token: authData.token,
        uid: authData.uid
      });
      dispatch(populateTodos());
    }, (error) => {
      throw new Error(error.message);
    });
  }
};

export var logoutUser = () => {
  return (dispatch, getState) => {
    firebaseRef.unauth();
    dispatch({
      type: 'LOGOUT'
    });
  }
};
