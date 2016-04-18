import {combineReducers} from 'redux';
import flashMessage from 'reducers/flash-message';
import login from 'reducers/login';
import searchText from 'reducers/search-text';
import showCompleted from 'reducers/show-completed';
import signup from 'reducers/signup';
import todos from 'reducers/todos';

export default combineReducers({
  flashMessage,
  login,
  searchText,
  showCompleted,
  signup,
  todos
});
