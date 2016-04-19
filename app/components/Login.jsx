var React = require('react');
var {connect} = require('react-redux');
var {hashHistory} = require('react-router');
import * as actions from 'actions';

export var Login = React.createClass({
  handleChange: function (e) {
    var {dispatch} = this.props;

    dispatch(actions.changeLogin({
      [e.target.name]: e.target.value
    }));
  },
  handleSubmit: function (e) {
      var {dispatch, email, password} = this.props;
      e.preventDefault();
      dispatch(actions.startLogin(email, password));
  },
  render: function() {
    var {email, password, isLoading} = this.props;
    var {handleChange} = this;

    console.log('Login isLoading', isLoading);

    return (
      <div className="auth-page">
        <div className="auth-page__box">
          <h3 className="text-center">Login</h3>

          <form onSubmit={this.handleSubmit}>
            <input autoFocus type="text" name="email" ref="email" placeholder="Email" value={email} onChange={handleChange}/>
            <input type="password" name="password" ref="password" placeholder="Password" value={password} onChange={handleChange}/>
            <button className="button expanded" disabled={isLoading}>Login</button>
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
