var React = require('react');
var {connect} = require('react-redux');
var {hashHistory} = require('react-router');
import * as actions from 'actions';

export var RequestReset = React.createClass({
  getInitialState: function () {
    return {
      errorMessage: undefined
    };
  },
  handleSubmit: function (e) {
      var {dispatch} = this.props;

      e.preventDefault();

      // TODO - USE ON CHANGE FOR EMAIL STATE SO WE CAN USE SETSTATE TO CLEAR EMAIL
      dispatch(actions.requestReset(this.refs.email.value)).then(() => {
        this.setState({
          errorMessage: 'We sent an email with reset instructions.'
        });
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
          <h3 className="text-center">Reset Password</h3>

          <form onSubmit={this.handleSubmit}>
            {renderErrorMessage()}
            <input type="text" name="email" ref="email" placeholder="Email"/>
            <button className="button expanded">Reset</button>
          </form>

          <p className="text-center">
            <a href="#/">Signup</a>
            <a href="#/login">Login</a>
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
)(RequestReset);
