import expect from 'expect';
import df from 'deep-freeze-strict';
import requestReset from 'reducers/request-reset';

describe('Request Reset Reducer', () => {

  it('should update request reset page state', () => {
    var action = {
      type: 'CHANGE_REQUEST_RESET',
      email: 'test@example.com'
    };
    var res = requestReset(undefined, df(action));

    expect(res.email).toEqual(action.email);
    expect(res.isLoading).toEqual(false);
  });

  it('should clear request reset page', () => {
    var action = {
      type: 'RESET_REQUEST_RESET'
    };
    var currentState = {
      isLoading: true,
      email: 'andrew@example.com'
    };
    var res = requestReset(df(currentState), df(action));

    expect(res.email).toEqual('');
    expect(res.isLoading).toEqual(false);
  });

});
