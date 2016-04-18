const defaultState = {
  isLoading: false,
  email: '',
  password: ''
};

export default (state = defaultState, action) => {
  var updates = {...action};
  delete updates.type;

  switch (action.type) {
    case 'CHANGE_SIGNUP':
      {
        return {
          ...state,
          ...updates
        };
      }
    case 'RESET_SIGNUP':
      {
        return {
          ...defaultState
        };
      }
    default:
      return state;
  };
};
