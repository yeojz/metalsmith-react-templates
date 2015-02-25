var React = require('react');

var DefaultTemplate = React.createClass({
  getInitialState: function() {
    return this.props; //pulled from src/index.html
  },
  render: function() {
    return <div>
      <h1>{this.state.title}</h1>
      <p>{this.state.contents}</p>
      <input/>
      <p onClick={this.clickHandler} >Then click me!</p>
    <div style={{display: "none"}} id="props" dangerouslySetInnerHTML={{__html: JSON.stringify(this.props)}}></div>
    <script src="bundle.js"></script>
    </div>
  },
  clickHandler: function() {
    //this demos a simple client side change
    this.setState({contents: "The template was changed through a client side template. Note that the input was not cleared."});
  }
});

module.exports = DefaultTemplate;
