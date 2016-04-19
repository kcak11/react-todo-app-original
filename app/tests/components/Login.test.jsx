import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import $ from 'jquery'

import * as actions from 'actions';
import {Login} from 'Login';

// var promiseSpy = (spy, shouldSucceed = true;) => {
//   spy.apply(arguments);
//
//   return new Promise((resolve, reject) {
//     if (shouldSucceed) {
//       resolve();
//     } else {
//       reject();
//     }
//   });
// }

describe('Login', () => {
  // Test variables
  const exampleEmail = 'test@example.com';
  const examplePassword = 'password123!';

  it('should exist', () => {
    expect(Login).toExist();
  });

  // it('should dispatch user creation on submit', () => {
  //   var spy = expect.createSpy();
  //   var fieldData = {
  //     email: {
  //       value: exampleEmail
  //     },
  //     password: {
  //       value: examplePassword
  //     }
  //   }
  //   var login = TestUtils.renderIntoDocument(<Login fields={fieldData} dispatch={promiseSpy(true)}/>);
  //   var $el = $(ReactDOM.findDOMNode(login));
  //
  //   TestUtils.Simulate.submit($el.find('form')[0]);
  //
  //   expect(spy).toHaveBeenCalledWith(actions.startLogin(exampleEmail, examplePassword));
  // });

});
