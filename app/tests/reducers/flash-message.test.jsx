import expect from 'expect';
import df from 'deep-freeze-strict';
import flashMessage from 'reducers/flash-message';

describe('Flash Message Reducer', () => {

  it('should set flash message', () => {
    var action = {
      type: 'SHOW_FLASH_MESSAGE',
      message: 'My message',
      messageType: 'error'
    };
    var res = flashMessage(undefined, df(action));

    expect(res.message).toEqual(action.message);
    expect(res.messageType).toEqual(action.messageType);
  });

  it('should default message type to alert', () => {
    var action = {
      type: 'SHOW_FLASH_MESSAGE',
      message: 'My message'
    };
    var res = flashMessage(undefined, df(action));

    expect(res.messageType).toEqual('alert');
  });

  it('should clear message and message type', () => {
    var action = {
      type: 'CLEAR_FLASH_MESSAGE'
    };
    var currentState = {
      message: 'Current message',
      messageType: 'success'
    };
    var res = flashMessage(df(currentState), df(action));

    expect(res.message).toNotExist();
    expect(res.messageType).toNotExist();
  });

});
