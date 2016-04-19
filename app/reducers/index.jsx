import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import flashMessage from 'reducers/flash-message';
import user from 'reducers/user';
import login from 'reducers/login';
import searchText from 'reducers/search-text';
import requestReset from 'reducers/request-reset';
import showCompleted from 'reducers/show-completed';
import todos from 'reducers/todos';

export default combineReducers({
  flashMessage,
  form: formReducer,
  login,
  requestReset,
  searchText,
  showCompleted,
  todos,
  user
});
