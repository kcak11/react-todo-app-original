import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import $ from 'jquery'

import * as actions from 'actions';
import {Signup} from 'Signup';

describe('Signup', () => {
  // Test variables
  const exampleEmail = 'test@example.com';
  const examplePassword = 'password123!';
  var spy;
  var signup;
  var $el;

  beforeEach(() => {
    spy = expect.createSpy();
    signup = TestUtils.renderIntoDocument(<Signup dispatch={spy}/>);
    $el = $(ReactDOM.findDOMNode(signup));
  });

  it('should exist', () => {
    expect(Signup).toExist();
  });

  it('should dispatch action on input change email', () => {
    signup.refs.email.value = exampleEmail;
    TestUtils.Simulate.change(signup.refs.email);

    expect(spy).toHaveBeenCalledWith(actions.changeSignup({email: exampleEmail}));
  });

  it('should dispatch action on input change password', () => {
    signup.refs.password.value = examplePassword;
    TestUtils.Simulate.change(signup.refs.password);

    expect(spy).toHaveBeenCalledWith(actions.changeSignup({password: examplePassword}));
  });

  it('should dispatch user creation on submit', () => {
    signup.refs.email.value = exampleEmail;
    signup.refs.password.value = examplePassword;
    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toHaveBeenCalledWith(actions.createUser(exampleEmail, examplePassword));
  });

});
