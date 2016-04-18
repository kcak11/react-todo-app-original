import expect from 'expect';
import df from 'deep-freeze-strict';
import showCompleted from 'reducers/show-completed';

describe('Show Completed Reducer', () => {

  it('should toggle current state', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };
    var currentState = true;
    var res = showCompleted(currentState, df(action));

    expect(res).toEqual(false);
  });

  it('should toggle default', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };
    var currentState = undefined;
    var res = showCompleted(currentState, df(action));

    expect(res).toEqual(true);
  });

});
