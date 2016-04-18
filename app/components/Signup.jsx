import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import * as actions from 'actions'

export var Signup =  React.createClass({
  handleChange: function (e) {
    var {dispatch} = this.props;

    dispatch(actions.changeSignup({
      [e.target.name]: e.target.value
    }));
  },
  handleSubmit: function (e) {
      var {dispatch, email, password} = this.props;
      e.preventDefault();
      dispatch(actions.createUser(email, password));
  },
  render: function () {
    var {email, password, isLoading} = this.props;
    var {handleChange} = this;

    return (
      <div className="auth-page">
        <div className="auth-page__box">
          <h3 className="text-center">Signup</h3>

          <form onSubmit={this.handleSubmit}>
            <input type="text" name="email" ref="email" placeholder="Email" value={email} onChange={handleChange}/>
            <input type="password" name="password" ref="password" placeholder="Password" value={password} onChange={handleChange}/>
            <button className="button expanded" disabled={isLoading}>Create Account</button>
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
    return state.signup;
  }
)(Signup);
