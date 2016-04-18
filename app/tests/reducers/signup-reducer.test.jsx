import expect from 'expect';
import df from 'deep-freeze-strict';
import signup from 'reducers/signup';

describe('Signup Reducer', () => {

  it('should update signup page state', () => {
    var action = {
      type: 'CHANGE_SIGNUP',
      email: 'test@example.com',
      password: 'somepass'
    };
    var res = signup(undefined, df(action));

    expect(res.email).toEqual(action.email);
    expect(res.password).toEqual(action.password);
    expect(res.isLoading).toEqual(false);
  });

  it('should clear signup page', () => {
    var action = {
      type: 'RESET_SIGNUP'
    };
    var currentState = {
      isLoading: true,
      email: 'andrew@example.com',
      password: ''
    };
    var res = signup(df(currentState), df(action));

    expect(res.email).toEqual('');
    expect(res.password).toEqual('');
    expect(res.isLoading).toEqual(false);
  });

});
