var React = require('react');
var {connect} = require('react-redux');
import * as actions from 'actions'

export var Signup =  React.createClass({
  handleSubmit: function (e) {
      var {dispatch} = this.props;

      e.preventDefault();

      console.log('Handle submit!');
      dispatch(actions.createUser(this.refs.email.value, this.refs.password.value));
  },
  render: function () {
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
        <h1>Signup</h1>

        <form onSubmit={this.handleSubmit}>
          {renderErrorMessage()}
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
    return {
      ...state.signup
    }
  }
)(Signup);
