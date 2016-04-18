var React = require('react');
var {connect} = require('react-redux');
import * as actions from 'actions'
import noty from 'noty';

var notyDefaults = {
  dismissQueue: false,
  maxVisible: 1,
  timeout: 4000,
  killer: true,
  theme: 'relax',
  layout: 'topCenter',
  animation: {
    open: 'animated fadeIn',
    close: 'animated fadeOut'
  }
};

export var FlashMessage = React.createClass({
  showFlashMessage: function () {
    var {dispatch} = this.props;

    if (this.props.flashMessage.message) {
      noty({
        ...notyDefaults,
        text: this.props.flashMessage.message,
        type: this.props.flashMessage.messageType
      });
      dispatch(actions.clearFlashMessage());
    }
  },
  componentDidMount: function () {
    this.showFlashMessage();
  },
  componentDidUpdate: function () {
    this.showFlashMessage();
  },
  render: function () {
    return (<div/>);
  }
});

export default connect(
  (state) => {
    return {
      flashMessage: state.flashMessage
    };
  }
)(FlashMessage);
