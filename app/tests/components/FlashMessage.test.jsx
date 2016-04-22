import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import $ from 'jquery'

import * as actions from 'actions/index';
import {FlashMessage} from 'components/FlashMessage';

describe('FlashMessage', () => {
  it('should exist', () => {
    expect(FlashMessage).toExist();
  });

  it('should call noty if flash message exists', () => {
    var flashMessageProp = {
      message: 'My message',
      messageType: 'alert'
    };
    var spy = expect.createSpy();
    var flashMessage = TestUtils.renderIntoDocument(<FlashMessage dispatch={spy} flashMessage={flashMessageProp}/>);

    expect(spy).toHaveBeenCalledWith({type: 'CLEAR_FLASH_MESSAGE'});
  });

  it('should not call noty if no flash message provided', () => {
    var spy = expect.createSpy();
    var flashMessage = TestUtils.renderIntoDocument(<FlashMessage dispatch={spy} flashMessage={{}}/>);

    expect(spy).toNotHaveBeenCalled();
  });
});
