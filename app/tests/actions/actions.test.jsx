import expect from 'expect';
import * as actions from 'actions';
import {configure} from 'configureStore';
import {email, password, badPassword, reset, login, createUser, createSampleTodo} from 'app/test-utils/firebase';

var createGetState = (state) => {
  return () => {
    return state;
  };
};

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

  describe('Logged in tests', () => {
    var uid;
    var todoId;

    beforeEach((done) => {
      login().then((res) => {
        uid = res.uid;
        todoId = res.todoId;
        done()
      }).catch((e) => console.log('** e', e, e.stack));
    });

    afterEach((done) => {
      reset().then(() => {
        uid = undefined;
        done();
      });
    });

    it('should dispatch logout', (done) => {
      var spy = expect.createSpy()
      var failingSpy = expect.createSpy().andThrow(new Error('Should not have been called'))
      var res = actions.startLogout();

      res(spy, createGetState({})).then(() => {
        expect(spy).toHaveBeenCalledWith(actions.logout());
        expect(window.location.hash).toMatch(/#\/login/);
        done();
      }, failingSpy);
    });

    it('should create new todo item', (done) => {
      var spy = expect.createSpy();
      var failingSpy = expect.createSpy().andThrow(new Error('Should not have been called'))
      var res = actions.createTodo('Something todo');

      res(spy, createGetState({user: {uid}})).then(() => {
        expect(spy.calls.length).toBe(1);
        done();
      }, failingSpy);
    });

    it('should call dispatch for each todo', (done) => {
      var spy = expect.createSpy();
      var failingSpy = expect.createSpy().andThrow(new Error('Should not have been called'))
      var res = actions.populateTodos();
      res(spy, createGetState({user: {uid}}))

      setTimeout(() => {
        expect(spy.calls.length).toBe(1);
        done();
      }, 1000);
    });

    it('should call dispatch once to toggle todo', (done) => {
      var spy = expect.createSpy();
      var failingSpy = expect.createSpy().andThrow(new Error('Should not have been called'))
      var res = actions.toggleTodo(todoId);
      res(spy, createGetState({user: {uid}}))

      setTimeout(() => {
        expect(spy.calls.length).toBe(1);
        done();
      }, 1000);
    });
  });

  describe('User exists tests', () => {
    beforeEach((done) => {
      createUser().then(() => {
        done()
      });
    });

    afterEach((done) => {
      reset().then(() => {
        done()
      });
    });

    it('should reset login and show error on failed login', (done) => {
      var spy = expect.createSpy();
      var failingSpy = expect.createSpy().andThrow(new Error('Should not have been called'))
      var res = actions.startLogin(email, badPassword);

      res(spy, createGetState({})).then(failingSpy, () => {
        expect(spy.calls.length).toEqual(2)
        done();
      });
    });

    it('should login and redirect with valid email and password', (done) => {
      var spy = expect.createSpy();
      var failingSpy = expect.createSpy().andThrow(new Error('Should not have been called'))
      var res = actions.startLogin(email, password);

      res(spy, createGetState({})).then(() => {
        expect(spy.calls.length).toEqual(2);
        expect(window.location.hash).toMatch(/#\/todos/);
        done();
      }, failingSpy);
    });

    it('should request reset and redirect to login', (done) => {
      var spy = expect.createSpy();
      var failingSpy = expect.createSpy().andThrow(new Error('Should not have been called'))
      var res = actions.requestReset(email);

      res(spy, createGetState({})).then(() => {
        expect(spy.calls.length).toEqual(1);
        expect(window.location.hash).toMatch(/#\/login/);
        done();
      }, failingSpy);
    });

    it ('should show message and redirect on password set', (done) => {
      var spy = expect.createSpy();
      var failingSpy = expect.createSpy().andThrow(new Error('Should not have been called'))
      var res = actions.changePassword({
        email,
        oldPassword: password,
        newPassword: password
      });

      res(spy, createGetState({})).then(() => {
        expect(spy.calls.length).toEqual(1);
        expect(window.location.hash).toMatch(/#\/todos/);
        done();
      }, failingSpy);
    });
  });

  describe('Pure firebase tests', () => {
    afterEach((done) => {
      reset(done).then(() => {
        done()
      }, () => {
        done();
      });
    });

    it('should create user and redirect', (done) => {
      var spy = expect.createSpy();
      var failingSpy = expect.createSpy().andThrow(new Error('Should not have been called'))
      var res = actions.createUser(email, password);

      res(spy, createGetState({})).then(() => {
        expect(spy.calls.length).toEqual(2);
        expect(window.location.hash).toMatch(/#\/login/);
        done();
      }, failingSpy);
    });

    it('should not create user and throw error', (done) => {
      var spy = expect.createSpy();
      var failingSpy = expect.createSpy().andThrow(new Error('Should not have been called'))
      var res = actions.createUser();

      res(spy, createGetState({})).then(failingSpy, () => {
        expect(spy.calls.length).toEqual(1);
        done();
      });
    });
  });
});
