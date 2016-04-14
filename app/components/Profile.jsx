var React = require('react');
var {connect} = require('react-redux');
var {hashHistory} = require('react-router');
import * as actions from 'actions';

export var Profile = React.createClass({
  render: function() {
    var {dispatch} = this.props;

    return (
      <button onClick={() => {
        dispatch(actions.logoutUser());
      }}>Logout</button>
    );
  }
});

export default connect(
  (state) => {
    return {
      ...state.login
    };
  }
)(Profile);
