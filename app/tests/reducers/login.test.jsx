import expect from 'expect';
import df from 'deep-freeze-strict';
import login from 'reducers/login';

describe('Login Reducer', () => {

  it('should update login page state', () => {
    var action = {
      type: 'CHANGE_LOGIN',
      email: 'test@example.com',
      password: 'somepass'
    };
    var res = login(undefined, df(action));

    expect(res.email).toEqual(action.email);
    expect(res.password).toEqual(action.password);
    expect(res.isLoading).toEqual(false);
  });

  it('should clear login page', () => {
    var action = {
      type: 'RESET_LOGIN'
    };
    var currentState = {
      isLoading: true,
      email: 'andrew@example.com',
      password: ''
    };
    var res = login(df(currentState), df(action));

    expect(res.email).toEqual('');
    expect(res.password).toEqual('');
    expect(res.isLoading).toEqual(false);
  });

});
