var React = require('react');

var DefaultTemplate = React.createClass({
  render: function() {
    return (
      <div>{this.props.contents}</div>
    );
  }
});

module.exports = DefaultTemplate;