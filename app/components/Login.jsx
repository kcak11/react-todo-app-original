var React = require('react');
var {connect} = require('react-redux');
import * as actions from 'actions';

export var Login = React.createClass({
  handleSubmit: function (e) {
      var {dispatch} = this.props;

      e.preventDefault();

      console.log('Handle login!');
      dispatch(actions.loginUser(this.refs.email.value, this.refs.password.value));
  },
  render: function() {
    var {errorMessage} = this.props;
    var renderErrorMessage = () => {
      if (errorMessage) {
        return (
          <p>{errorMessage}</p>
        );
      } else {
        return;
      }
    };
    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          {renderErrorMessage()}
          <input type="text" name="email" ref="email" placeholder="Email"/>
          <input type="password" name="password" ref="password" placeholder="Password"/>
          <button>Login</button>
        </form>

        <a href="#/">Need an account? Signup</a>
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
