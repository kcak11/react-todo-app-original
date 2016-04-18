var React = require('react');
var {connect} = require('react-redux');
var {hashHistory} = require('react-router');
import * as actions from 'actions';

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
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  dispatch(actions.startLogout()).then(() => {
                    hashHistory.push('/login');
                  });
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

export default connect(
  (state) => {
    return {
      ...state.user
    };
  }
)(Profile);
