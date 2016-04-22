import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import $ from 'jquery'

import createPromiseSpy from 'test-utils/promise-spy';
import * as actions from 'actions/index';
import {SetPassword} from 'components/SetPassword';

describe('SetPassword', () => {
  const exampleEmail = 'test@example.com';
  const exampleOldPassword = 'password123!';
  const exampleNewPassword = 'newpassword123!';
  const fieldData = {
    email: {
      value: exampleEmail
    },
    oldPassword: {
      value: exampleOldPassword
    },
    newPassword: {
      value: exampleNewPassword
    }
  };

  it('should exist', () => {
    expect(SetPassword).toExist();
  });

  it('should dispatch change password on submit', (done) => {
    var {spy, promiseSpy, completedPromise} = createPromiseSpy(true);
    var setPassword = TestUtils.renderIntoDocument(<SetPassword fields={fieldData} dispatch={promiseSpy}/>);
    var $el = $(ReactDOM.findDOMNode(setPassword));

    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(setPassword.state.isLoading).toEqual(true);
    expect(spy).toHaveBeenCalledWith(actions.changePassword(exampleEmail, exampleOldPassword, exampleNewPassword));

    completedPromise.then(() => {
      expect(setPassword.state.isLoading).toEqual(false);
      done();
    });
  });
});
