import expect from 'expect';
import * as actions from 'actions';
import {configure} from 'configureStore';
// import * as FBTestUtils from 'app/test-utils/firebase';

var userOne;

describe('Actions', () => {

  it('should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    };
    var res = actions.setSearchText(action.searchText);

    expect(res).toEqual(action);
  });

  it('should generate toggle show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };
    var res = actions.toggleShowCompleted();

    expect(res).toEqual(action);
  });

  it('should generate add todo action', () => {
    var expectedAction = {
      type: 'ADD_TODO',
      todo: {
        id: '123',
        text: 'Something todo',
        completed: false,
        completedAt: undefined,
        createdAt: 82384324
      }
    };
    var res = actions.addTodo(expectedAction.todo);

    expect(res).toEqual(expectedAction);
  });

  it('should generate toggle todo action', () => {
    var expectedAction = {
      type: 'UPDATE_TODO',
      id: '123',
      updates: {
        completed: true
      }
    };
    var res = actions.updateTodo(expectedAction.id, {
      completed: true
    });

    expect(res).toEqual(expectedAction);
  });

  it('should generate login action', () => {
    var expectedAction = {
      type: 'LOGIN',
      token: '123token',
      uid: '123uid'
    };
    var res = actions.login(expectedAction.token, expectedAction.uid);

    expect(res).toEqual(expectedAction);
  });

  it('should generate logout action', () => {
    var expectedAction = {type: 'LOGOUT'};
    var res = actions.logout();

    expect(res).toEqual(expectedAction);
  });

  it('should generate flash message action object', () => {
    var expectedAction = {
      type: 'SHOW_FLASH_MESSAGE',
      message: 'My message',
      messageType: 'alert'
    };
    var res = actions.showFlashMessage(expectedAction.message, expectedAction.messageType);

    expect(res).toEqual(expectedAction);
  });

  it('should generate clear message action', () => {
    var expectedAction = {type: 'CLEAR_FLASH_MESSAGE'};
    var res = actions.clearFlashMessage();

    expect(res).toEqual(expectedAction);
  });

  it('should create new todo an dispatch action when complete', () => {
    var store = configure();
    var thunk = actions.createTodo('My todo text');

  });

});
