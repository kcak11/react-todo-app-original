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
