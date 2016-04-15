var React = require('react');
var {connect} = require('react-redux');
var {hashHistory} = require('react-router');
import * as actions from 'actions';

export var Login = React.createClass({
  handleSubmit: function (e) {
      var {dispatch} = this.props;

      e.preventDefault();

      dispatch(actions.loginUser(this.refs.email.value, this.refs.password.value)).then((isTemporaryPassword) => {
        console.log('login success. is temp:', isTemporaryPassword);
        if (isTemporaryPassword) {
          hashHistory.push('/set-password');
          dispatch(actions.showFlashMessage('Please set a new password', 'success'));
        } else {
          hashHistory.push('/todos');
        }
      }, (e) => {
        dispatch(actions.showFlashMessage(e.message, 'error'));
      })
  },
  render: function() {
    return (
      <div className="auth-page">
        <div className="auth-page__box">
          <h3 className="text-center">Login</h3>

          <form onSubmit={this.handleSubmit}>
            <input type="text" name="email" ref="email" placeholder="Email"/>
            <input type="password" name="password" ref="password" placeholder="Password"/>
            <button className="button expanded">Login</button>
          </form>

          <p className="auth-page__actions">
            <a href="#/">Signup</a>
            <a href="#/request-reset">Reset</a>
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
)(Login);
