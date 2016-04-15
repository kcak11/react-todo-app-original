var React = require('react');
var {connect} = require('react-redux');
var {hashHistory} = require('react-router');
import * as actions from 'actions'

export var Signup =  React.createClass({
  handleSubmit: function (e) {
      var {dispatch} = this.props;
      e.preventDefault();

      actions.createUser(this.refs.email.value, this.refs.password.value).then(() => {
        hashHistory.push('/login');
        dispatch(actions.showFlashMessage('Account created!', 'success'));
      }, (e) => {
        dispatch(actions.showFlashMessage(e.message, 'error'));
      });
  },
  render: function () {
    return (
      <div className="auth-page">
        <div className="auth-page__box">
          <h3 className="text-center">Signup</h3>

          <form onSubmit={this.handleSubmit}>
            <input type="text" name="email" ref="email" placeholder="Email"/>
            <input type="password" name="password" ref="password" placeholder="Password"/>
            <button className="button expanded">Create Account</button>
          </form>

          <p className="auth-page__actions">
            <a href="#/login">Login</a>
            <a href="#/request-reset">Reset</a>
          </p>
      </div>
      </div>
    )
  }
});

export default connect(
  (state) => {
    return {};
  }
)(Signup);
