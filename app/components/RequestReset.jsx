var React = require('react');
var {connect} = require('react-redux');
var {hashHistory} = require('react-router');
import * as actions from 'actions';

export var RequestReset = React.createClass({
  handleSubmit: function (e) {
      var {dispatch} = this.props;

      e.preventDefault();

      // TODO - USE ON CHANGE FOR EMAIL STATE SO WE CAN USE SETSTATE TO CLEAR EMAIL
      dispatch(actions.requestReset(this.refs.email.value)).then(() => {
        dispatch(actions.showFlashMessage('We sent an email with reset instructions.', 'success'));
        hashHistory.push('/login');
      }, (e) => {
        dispatch(actions.showFlashMessage(e.message, 'error'));
      })
  },
  render: function() {
    return (
      <div className="auth-page">
        <div className="auth-page__box">
          <h3 className="text-center">Reset Password</h3>

          <form onSubmit={this.handleSubmit}>
            <input type="text" name="email" ref="email" placeholder="Email"/>
            <button className="button expanded">Reset</button>
          </form>

          <p className="auth-page__actions">
            <a href="#/">Signup</a>
            <a href="#/login">Login</a>
          </p>
        </div>
      </div>
    );
  }
});

export default connect(
  (state) => {
    return {
      ...state.login
    }
  }
)(RequestReset);
