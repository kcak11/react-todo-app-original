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
        <p>{errorMessage}</p>
      );
    }
  },
  render: function () {
    var {errorMessage} = this.state;

    return (
      <div>
        <h1>Signup</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderErrorMessage(errorMessage)}
          <input type="text" name="email" ref="email" placeholder="Email"/>
          <input type="password" name="password" ref="password" placeholder="Password"/>
          <button>Create Account</button>
        </form>

        <a href="#/login">Already have an account? Login</a>
      </div>
    )
  }
});

export default connect(
  (state) => {
    return {};
  }
)(Signup);
