var React = require('react');

var DefaultTemplate = React.createClass({
  getInitialState: function() {
    return {
      description: this.props.description
    }
  },
  render: function() {
    return <div>
      <h1>{this.state.description}</h1>
      <p>First write something into the input</p>
      <input/>
      <p onClick={this.clickHandler} >Then click me!</p>
    <script id="props" dangerouslySetInnerHTML={{__html: JSON.stringify(this.props)}}></script>
    </div>
  },
  clickHandler: function() {
    this.setState({description: "changed!"});
  }
});

module.exports = DefaultTemplate;
