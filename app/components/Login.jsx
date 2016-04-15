var React = require('react');
var {connect} = require('react-redux');
var {hashHistory} = require('react-router');
import * as actions from 'actions';

export var Login = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false
    };
  },
  componentDidMount: function () {
    this.refs.email.focus();
  },
  handleChange: function (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  },
  handleSubmit: function (e) {
      var {dispatch} = this.props;

      e.preventDefault();

      this.setState({isLoading: true});
      dispatch(actions.startLogin(this.refs.email.value, this.refs.password.value)).then((isTemporaryPassword) => {
        this.setState({isLoading: false});
        if (isTemporaryPassword) {
          hashHistory.push('/set-password');
          dispatch(actions.showFlashMessage('Please set a new password', 'success'));
        } else {
          hashHistory.push('/todos');
        }
      }, (e) => {
        this.setState({password: undefined, isLoading: false});
        dispatch(actions.showFlashMessage(e.message, 'error'));

      })
  },
  render: function() {
    var {email, password, isLoading} = this.state;
    var {handleChange} = this;

    return (
      <div className="auth-page">
        <div className="auth-page__box">
          <h3 className="text-center">Login</h3>

          <form onSubmit={this.handleSubmit}>
            <input type="text" name="email" ref="email" placeholder="Email" value={email} onChange={handleChange}/>
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
