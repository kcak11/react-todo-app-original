import React from 'react';
import {reduxForm} from 'redux-form';
import {hashHistory} from 'react-router';
import * as actions from 'actions/index';

export var RequestReset = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false
    };
  },
  handleSubmit: function(e) {
    const {dispatch, fields: {email}} = this.props;

    e.preventDefault();
    this.setState({isLoading: true});

    dispatch(actions.requestReset(email.value)).then(() => {
      this.setState({isLoading: false});
    }, () => {
      this.setState({isLoading: false});
    });
  },
  render: function() {
    const {isLoading} = this.state;
    const {fields: {email}} = this.props;

    return (
      <div className="auth-page">
        <div className="auth-page__box">
          <h3 className="text-center">Reset Password</h3>

          <form onSubmit={this.handleSubmit}>
            <input autoFocus type="text" ref="email" placeholder="Email" {...email}/>
            <button className="button expanded" disabled={isLoading}>Reset</button>
          </form>

          <p className="auth-page__actions">
            <a href="#/">Signup</a>
            <a href="#/login">Login</a>
          </p>
        </div>
      </div>
    );
  }
});

export default reduxForm({
  form: 'requestReset',
  fields: ['email']
})(RequestReset);
