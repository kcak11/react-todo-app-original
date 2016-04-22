import React from 'react';
import {connect} from 'react-redux'
import {hashHistory} from 'react-router';

import * as actions from 'app/actions/index';

export var Profile = React.createClass({
  componentDidMount: function () {
    var elem = new Foundation.DropdownMenu($('.dropdown.menu'), {});
  },
  render: function() {
    var {dispatch} = this.props;

    return (
      <div className="actions">
        <ul className="dropdown menu" data-dropdown-menu>
          <li>
            <a href="#" onClick={e => e.preventDefault()}>Account</a>
            <ul className="menu">
              <li>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  hashHistory.push('/set-password');
                }}>
                  Update Password
                </a>
                <a href="#" ref="logout" onClick={(e) => {
                  e.preventDefault();
                  dispatch(actions.startLogout());
                }}>
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
});

export default connect()(Profile);
