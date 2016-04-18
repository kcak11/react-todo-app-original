export default (state = {token: undefined, uid: undefined}, action) => {
  switch (action.type) {
    case 'LOGIN':
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
