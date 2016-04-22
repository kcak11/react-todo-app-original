import React from 'react';
import {reduxForm} from 'redux-form';
import {hashHistory} from 'react-router';
import * as actions from 'actions/index'

export var Signup = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false
    };
  },
  handleSubmit: function(e) {
    const {dispatch, fields: {password, email}} = this.props;

    e.preventDefault();
    this.setState({isLoading: true});

    dispatch(actions.createUser(email.value, password.value)).then(() => {
      this.setState({isLoading: false});
    }, () => {
      this.setState({isLoading: false});
    });
  },
  render: function() {
    const {isLoading} = this.state;
    const {fields: {password, email}} = this.props;

    return (
      <div className="auth-page">
        <div className="auth-page__box">
          <h3 className="text-center">Signup</h3>

          <form onSubmit={this.handleSubmit}>
            <input autoFocus type="text" placeholder="Email" {...email}/>
            <input type="password" ref="password" placeholder="Password" {...password}/>
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

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password']
})(Signup);
