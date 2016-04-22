import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import $ from 'jquery'

import createPromiseSpy from 'app/test-utils/promise-spy';
import * as actions from 'app/actions/index';
import {Login} from 'Login';

describe('Login', () => {
  const exampleEmail = 'test@example.com';
  const examplePassword = 'password123!';
  const fieldData = {
    email: {
      value: exampleEmail
    },
    password: {
      value: examplePassword
    }
  };

  it('should exist', () => {
    expect(Login).toExist();
  });

  it('should dispatch login on submit', (done) => {
    var {spy, promiseSpy, completedPromise} = createPromiseSpy(true);
    var login = TestUtils.renderIntoDocument(<Login fields={fieldData} dispatch={promiseSpy}/>);
    var $el = $(ReactDOM.findDOMNode(login));

    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(login.state.isLoading).toEqual(true);
    expect(spy).toHaveBeenCalledWith(actions.startLogin(exampleEmail, examplePassword));

    completedPromise.then(() => {
      expect(login.state.isLoading).toEqual(false);
      done();
    });
  });
});
