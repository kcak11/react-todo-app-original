var React = require('react');
var {connect} = require('react-redux');
var {hashHistory} = require('react-router');
import firebaseRef, {getUserRef} from 'firebaseRef';
import * as actions from 'actions';

export var SetPassword = React.createClass({
  handleSubmit: function (e) {
      var {dispatch} = this.props;
      var data = {
        email: this.refs.email.value,
        oldPassword: this.refs.oldPassword.value,
        newPassword: this.refs.newPassword.value
      }

      e.preventDefault();

      // TODO - USE ON CHANGE FOR EMAIL STATE SO WE CAN USE SETSTATE TO CLEAR EMAIL
      dispatch(actions.changePassword(data)).then(() => {
        // TODO - this should be part of the api - remove firebaseRef import
        dispatch(actions.showFlashMessage('Password reset!', 'success'));
        if (firebaseRef.getAuth()) {
          hashHistory.push('/todos');
        } else {
          hashHistory.push('/login');
        }
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
            <input type="password" name="oldPassword" ref="oldPassword" placeholder="Current password"/>
            <input type="password" name="newPassword" ref="newPassword" placeholder="New password"/>
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
)(SetPassword);
