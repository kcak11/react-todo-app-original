var React = require('react');
var {connect} = require('react-redux');
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

var FlashMessage = React.createClass({
  showFlashMessage: function () {
    if (this.props.flashMessage.message) {
      noty({
        ...notyDefaults,
        text: this.props.flashMessage.message,
        type: this.props.flashMessage.messageType
      });
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
