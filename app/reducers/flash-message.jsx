export default (state = {message: null, messageType: 'alert'}, action) => {
  switch (action.type) {
    case 'SHOW_FLASH_MESSAGE':
      return {
        message: action.message,
        messageType: action.messageType || 'alert'
      };
    case 'CLEAR_FLASH_MESSAGE':
      return {
        message: undefined,
        messageType: undefined
      };
    default:
      return state;
  }
};
