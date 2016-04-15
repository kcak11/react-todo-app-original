var uuid = require('node-uuid');
var moment = require('moment');

export var searchTextReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    case 'LOGOUT':
      return '';
    default:
      return state;
  };
};

export var showCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state;
    case 'LOGOUT':
      return '';
    default:
      return state;
  }
};

export var flashMessageReducer = (state = {message: null, messageType: 'alert'}, action) => {
  switch (action.type) {
    case 'SHOW_FLASH_MESSAGE':
      return {
        message: action.message,
        messageType: action.messageType
      };
    default:
      return state;
  }
};

export var todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        action.todo
      ];
    case 'UPDATE_TODO':
      return state.map((todo) => {
        if (todo.id === action.id) {
          var nextCompleted = !todo.completed;

          return {
            ...todo,
            ...action.updates
          };
        } else {
          return todo;
        }
      });
    case 'ADD_TODOS':
      return [
        ...state,
        ...action.todos
      ];
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export var loginReducer = (state = {token: undefined, uid: undefined}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.token,
        uid: action.uid
      }
    case 'LOGOUT':
      return {
        ...state,
        token: undefined,
        uid: undefined
      }
    default:
      return state;
  }
};
