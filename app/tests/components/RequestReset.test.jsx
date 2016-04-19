import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import $ from 'jquery'

import * as actions from 'actions';
import {RequestReset} from 'RequestReset';

describe('Request Reset', () => {
  // Test variables
  const exampleEmail = 'test@example.com';
  const examplePassword = 'password123!';
  // var spy;
  // var requestReset;
  // var $el;
  //
  // beforeEach(() => {
  //   spy = expect.createSpy();
  //   requestReset = TestUtils.renderIntoDocument(<RequestReset dispatch={spy}/>);
  //   $el = $(ReactDOM.findDOMNode(requestReset));
  // });

  it('should exist', () => {
    expect(RequestReset).toExist();
  });


  // it('should dispatch request reset on submit', () => {
  //   requestReset.refs.email.value = exampleEmail;
  //   requestReset.refs.password.value = examplePassword;
  //   TestUtils.Simulate.submit($el.find('form')[0]);
  //
  //   expect(spy).toHaveBeenCalledWith(actions.requestReset(exampleEmail));
  // });

});
