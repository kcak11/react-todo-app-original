import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import $ from 'jquery'

import createPromiseSpy from 'app/test-utils/promise-spy';
import * as actions from 'app/actions/index';
import {RequestReset} from 'RequestReset';

describe('RequestReset', () => {
  const exampleEmail = 'test@example.com';
  const fieldData = {
    email: {
      value: exampleEmail
    }
  };

  it('should exist', () => {
    expect(RequestReset).toExist();
  });

  it('should dispatch request reset on submit', (done) => {
    var {spy, promiseSpy, completedPromise} = createPromiseSpy(true);
    var requestReset = TestUtils.renderIntoDocument(<RequestReset fields={fieldData} dispatch={promiseSpy}/>);
    var $el = $(ReactDOM.findDOMNode(requestReset));

    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(requestReset.state.isLoading).toEqual(true);
    expect(spy).toHaveBeenCalledWith(actions.requestReset(exampleEmail));

    completedPromise.then(() => {
      expect(requestReset.state.isLoading).toEqual(false);
      done();
    });
  });
});
