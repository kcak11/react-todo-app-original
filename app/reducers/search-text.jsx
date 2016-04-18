export default (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    case 'CLEAR_SEARCH_TEXT':
      return '';
    default:
      return state;
  };
};
