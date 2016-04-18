import expect from 'expect';
import df from 'deep-freeze-strict';
import login from 'reducers/login';

describe('Login Reducer', () => {

  it('should set the token and uid', () => {
    var action = {
      type: 'LOGIN',
      token: 'sometoken',
      uid: 'someid'
    };
    var currentState = {};
    var res = login(df(currentState), df(action));

    expect(res.token).toEqual(action.token);
    expect(res.uid).toEqual(action.uid);
  });

  it('should clear the token and id', () => {
    var action = {
      type: 'LOGOUT'
    };
    var currentState = {
      token: 'currenttoken',
      uid: 'currentid'
    };
    var res = login(df(currentState), df(action));

    expect(res.token).toNotExist();
    expect(res.id).toNotExist();
  });

});
