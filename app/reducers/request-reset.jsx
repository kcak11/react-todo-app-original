import _ from 'lodash';

const defaultState = {
  isLoading: false,
  email: ''
};

export default (state = defaultState, action) => {
  var updates = {...action};
  delete updates.type;

  switch (action.type) {
    case 'CHANGE_REQUEST_RESET':
      {
        return {
          ...state,
          ..._.pick(action, ['isLoading', 'email'])
        };
      }
    case 'RESET_REQUEST_RESET':
      {
        return {
          ...defaultState
        };
      }
    default:
      return state;
  };
};
