'use strict';

var React = require('react');

var DefaultTemplate = React.createClass({
  render: function() {
    return (
      <div>
        <span>{this.props.title}</span>
        <span>{this.props.misc}</span>
        <span>{this.props.contents}</span>
      </div>
    );
  }
});

module.exports = DefaultTemplate;
