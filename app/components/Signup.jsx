var React = require('react');
var {connect} = require('react-redux');
var {hashHistory} = require('react-router');
import * as actions from 'actions'

export var Signup =  React.createClass({
  getInitialState: function () {
    return {
      errorMessage: undefined
    };
  },
  handleSubmit: function (e) {
      var {dispatch} = this.props;
      e.preventDefault();

      actions.createUser(this.refs.email.value, this.refs.password.value).then(() => {
        hashHistory.push('/login');
      }, (e) => {
        this.setState({
          errorMessage: e.message
        });
      });
  },
  renderErrorMessage: function (errorMessage) {
    if (errorMessage) {
      return (
        <p className="text-center">{errorMessage}</p>
      );
    }
  },
  render: function () {
    var {errorMessage} = this.state;

    return (
      <div className="auth-page">
        <div className="auth-page__form">
          <h3 className="text-center">Signup</h3>

          <form onSubmit={this.handleSubmit}>
            {this.renderErrorMessage(errorMessage)}
            <input type="text" name="email" ref="email" placeholder="Email"/>
            <input type="password" name="password" ref="password" placeholder="Password"/>
            <button className="button expanded">Create Account</button>
          </form>

          <p className="text-center">
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
