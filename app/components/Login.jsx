var React = require('react');
var {connect} = require('react-redux');
var {hashHistory} = require('react-router');
import * as actions from 'actions';

export var Login = React.createClass({
  getInitialState: function () {
    return {
      errorMessage: undefined
    };
  },
  handleSubmit: function (e) {
      var {dispatch} = this.props;

      e.preventDefault();

      dispatch(actions.loginUser(this.refs.email.value, this.refs.password.value)).then(() => {
        console.log('login success');
        hashHistory.push('/todos');
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
          <h1 className="text-center">Login</h1>

          <form onSubmit={this.handleSubmit}>
            {renderErrorMessage()}
            <input type="text" name="email" ref="email" placeholder="Email"/>
            <input type="password" name="password" ref="password" placeholder="Password"/>
            <button className="button expanded">Login</button>
          </form>

          <p className="text-center">
            <a href="#/">Need an account? Signup</a>
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
