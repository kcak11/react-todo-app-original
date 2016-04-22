import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import $ from 'jquery'

import createPromiseSpy from 'app/test-utils/promise-spy';
import * as actions from 'app/actions/index';
import {Profile} from 'Profile';

describe('Profile', () => {
  it('should exist', () => {
    expect(Profile).toExist();
  });

  it('should dispatch logout on link click', () => {
    var {spy, promiseSpy, completedPromise} = createPromiseSpy(true);
    var profile = TestUtils.renderIntoDocument(<Profile dispatch={promiseSpy}/>);
    var $el = $(ReactDOM.findDOMNode(profile));

    TestUtils.Simulate.click(profile.refs.logout);

    expect(spy).toHaveBeenCalledWith(actions.startLogout());
  });
});
