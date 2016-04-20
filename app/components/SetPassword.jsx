var React = require('react');
import {reduxForm} from 'redux-form';
var {hashHistory} = require('react-router');
import * as actions from 'actions';

export var SetPassword = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false
    };
  },
  handleSubmit: function(e) {
    const {dispatch, fields: {email, oldPassword, newPassword}} = this.props;

    e.preventDefault();
    this.setState({isLoading: true});

    dispatch(actions.changePassword({
      email: email.value,
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    })).then(() => {
      this.setState({isLoading: false});
    }, () => {
      this.setState({isLoading: false});
    });
  },

  render: function() {
    const {isLoading} = this.state;
    const {fields: {email, oldPassword, newPassword}} = this.props;

    return (
      <div className="auth-page">
        <div className="auth-page__box">
          <h3 className="text-center">Reset Password</h3>

          <form onSubmit={this.handleSubmit}>
            <input autoFocus type="email" ref="email" placeholder="Email" {...email}/>
            <input type="password" ref="oldPassword" placeholder="Current password" {...oldPassword}/>
            <input type="password" ref="newPassword" placeholder="New password" {...newPassword}/>
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
  form: 'setPassword',
  fields: ['email', 'oldPassword', 'newPassword']
})(SetPassword);
