import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import $ from 'jquery'

import createPromiseSpy from 'app/test-utils/promise-spy';
import * as actions from 'actions';
import {Signup} from 'Signup';

describe('Signup', () => {
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
    expect(Signup).toExist();
  });

  it('should dispatch user creation on submit', (done) => {
    var {spy, promiseSpy, completedPromise} = createPromiseSpy(true);
    var signup = TestUtils.renderIntoDocument(<Signup fields={fieldData} dispatch={promiseSpy}/>);
    var $el = $(ReactDOM.findDOMNode(signup));

    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(signup.state.isLoading).toEqual(true);
    expect(spy).toHaveBeenCalledWith(actions.createUser(exampleEmail, examplePassword));

    completedPromise.then(() => {
      expect(signup.state.isLoading).toEqual(false);
      done();
    });
  });
});
