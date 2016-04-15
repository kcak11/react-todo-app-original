var React = require('react');
var {connect} = require('react-redux');
var {hashHistory} = require('react-router');
import firebaseRef, {getUserRef} from 'firebaseRef';
import * as actions from 'actions';

export var SetPassword = React.createClass({
  getInitialState: function () {
    return {
      errorMessage: undefined
    };
  },
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

        if (firebaseRef.getAuth()) {
          hashHistory.push('/todos');
        } else {
          hashHistory.push('/login');
        }
      }, (e) => {
        this.setState({
          errorMessage: e.message
        });
      })
  },
  render: function() {
    var {errorMessage} = this.state;
    var renderErrorMessage = () => {
      if (errorMessage) {
        return (
          <p className="text-center">{errorMessage}</p>
        );
      } else {
        return;
      }
    };
    return (
      <div className="auth-page">
        <div className="auth-page__form">
          <h3 className="text-center">Reset Password</h3>

          <form onSubmit={this.handleSubmit}>
            {renderErrorMessage()}
            <input type="text" name="email" ref="email" placeholder="Email"/>
            <input type="password" name="oldPassword" ref="oldPassword" placeholder="Current password"/>
            <input type="password" name="newPassword" ref="newPassword" placeholder="New password"/>
            <button className="button expanded">Reset</button>
          </form>

          <p className="text-center">
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
