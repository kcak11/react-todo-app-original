var React = require('react');
import {reduxForm} from 'redux-form';
var {connect} = require('react-redux');
var {hashHistory} = require('react-router');
import * as actions from 'actions';

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
            <input type="text" name="email" ref="email" placeholder="Email" {...email}/>
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
