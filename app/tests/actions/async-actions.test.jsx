import expect from 'expect';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {email, unusedEmail, password, badPassword, reset, login, createUser, createSampleTodo} from 'test-utils/firebase';
import * as actions from 'actions/index';

const mockStore = configureStore([thunk]);

describe('Async Actions', () => {
  var triggerError;

  beforeEach(() => {
    triggerError = expect.createSpy().andThrow(new Error('Should not have been called'));
  });

  describe('Logged in tests', () => {
    var authData = {};

    beforeEach((done) => {
      login().then(({uid, todoId}) => {
        authData = {
          uid,
          todoId
        };
        done()
      })
    });

    afterEach((done) => {
      reset().then(() => {
        authData = {};
        done();
      });
    });

    it('should dispatch logout and redirect to login', (done) => {
      const store = mockStore({});
      store.dispatch(actions.startLogout(email, password)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toInclude({type: 'LOGOUT'});
        expect(window.location.hash).toMatch(/#\/login/);
        done();
      }).catch(done);
    });

    it('should create new todo item', (done) => {
      const store = mockStore({
        user: {
          uid: authData.uid
        }
      });
      const todoText = 'My todo item';
      store.dispatch(actions.createTodo(todoText)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toInclude({type: 'ADD_TODO'});
        expect(actions[0].todo).toInclude({
          text: todoText
        });
        done();
      }).catch(done);
    });

    it('should call dispatch for each todo', (done) => {
      const store = mockStore({
        user: {
          uid: authData.uid
        }
      });
      store.dispatch(actions.populateTodos()).then(() => {
        const actions = store.getActions();
        expect(actions[0].todo).toInclude({
          id: authData.todoId
        });
        done();
      }).catch(done);
    });

    it('should call dispatch once to toggle todo', (done) => {
      const store = mockStore({
        user: {
          uid: authData.uid
        }
      });
      store.dispatch(actions.toggleTodo(authData.todoId)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toInclude({
          type: 'UPDATE_TODO',
          id: authData.todoId
        });
        expect(actions[0].updates).toInclude({
          completed: true
        });
        done();
      }).catch(done);
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

    it('should reset login form and show error on failed login', (done) => {
      const store = mockStore({});
      store.dispatch(actions.startLogin(email, badPassword)).then(triggerError, () => {
        const actions = store.getActions();
        expect(actions[0]).toInclude({
          type: 'redux-form/RESET',
          form: 'login'
        });
        expect(actions[1]).toInclude({
          type: 'SHOW_FLASH_MESSAGE',
          messageType: 'error'
        });
        done();
      });
    });

    it('should login and redirect with valid email and password', (done) => {
      const store = mockStore({});
      store.dispatch(actions.startLogin(email, password)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toInclude({type: 'LOGIN'});
        expect(window.location.hash).toMatch(/#\/todos/);
        done();
      }).catch(done);
    });

    it('should request reset and redirect to login', (done) => {
      const store = mockStore({});
      store.dispatch(actions.requestReset(email)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toInclude({
          type: 'SHOW_FLASH_MESSAGE',
          messageType: 'success'
        });
        expect(window.location.hash).toMatch(/#\/login/);
        done();
      }).catch(done);
    });

    it('should render email not found message', (done) => {
      const store = mockStore({});
      store.dispatch(actions.requestReset(unusedEmail)).then(triggerError, () => {
        const actions = store.getActions();
        expect(actions[0]).toInclude({
          type: 'SHOW_FLASH_MESSAGE',
          messageType: 'error'
        });
        done();
      });
    });

    it ('should show message and redirect on password set', (done) => {
      const store = mockStore({});
      store.dispatch(actions.changePassword({
        email,
        oldPassword: password,
        newPassword: password
      })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toInclude({
          type: 'SHOW_FLASH_MESSAGE',
          messageType: 'success'
        });
        expect(window.location.hash).toMatch(/#\/todos/);
        done();
      }).catch(done);
    });

    it ('should show error message', (done) => {
      const store = mockStore({});
      store.dispatch(actions.changePassword({
        email,
        oldPassword: badPassword,
        newPassword: password
      })).then(triggerError, () => {
        const actions = store.getActions();
        expect(actions[0]).toInclude({
          type: 'SHOW_FLASH_MESSAGE',
          messageType: 'error'
        });
        done();
      });
    });
  });

  describe('Firebase without user', () => {
    beforeEach((done) => {
      reset().then(() => {
        done()
      });
    });

    it('should create user', (done) => {
      const store = mockStore({});
      const expectedActions = [
        actions.showFlashMessage('Account created!', 'success')
      ];

      store.dispatch(actions.createUser(email, password)).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        expect(window.location.hash).toMatch(/#\/login/);
        done();
      }).catch(done);
    });

    it('should not create user', (done) => {
      const store = mockStore({});

      store.dispatch(actions.createUser()).then(triggerError, () => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual('SHOW_FLASH_MESSAGE');
        expect(actions[0].messageType).toEqual('error');
        done();
      });
    });
  });
});
