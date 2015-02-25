var React = require('react');

var DefaultTemplate = React.createClass({
  getInitialState: function() {
    return {
      contents: this.props.contents
    }
  },
  render: function() {
    return <div>
      <h1>{this.state.contents}</h1>
      <p>First write something into the input</p>
      <input/>
      <p onClick={this.clickHandler} >Then click me!</p>
    <script id="props" dangerouslySetInnerHTML={{__html: JSON.stringify(this.props)}}></script>
    </div>
  },
  clickHandler: function() {
    this.setState({contents: "changed!"});
  }
});

module.exports = DefaultTemplate;
