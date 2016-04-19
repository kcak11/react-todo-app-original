var React = require('react');
var {connect} = require('react-redux');
var {hashHistory} = require('react-router');
import * as actions from 'actions';

export var RequestReset = React.createClass({
  handleChange: function (e) {
    var {dispatch} = this.props;

    dispatch(actions.changeRequestReset({
      [e.target.name]: e.target.value
    }));
  },
  handleSubmit: function (e) {
      var {email, isLoading, dispatch} = this.props;
      e.preventDefault();
      dispatch(actions.requestReset(email));
  },
  render: function() {
    var {email, isLoading} = this.props;
    var {handleChange} = this;
    
    return (
      <div className="auth-page">
        <div className="auth-page__box">
          <h3 className="text-center">Reset Password</h3>

          <form onSubmit={this.handleSubmit}>
            <input type="text" name="email" ref="email" placeholder="Email" value={email} onChange={handleChange}/>
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

export default connect(
  (state) => {
    return {
      ...state.requestReset
    }
  }
)(RequestReset);
