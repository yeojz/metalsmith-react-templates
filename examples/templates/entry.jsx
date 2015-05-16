import React from 'react';

const DefaultTemplate = React.createClass({
  getInitialState() {
    return this.props; //pulled from src/index.html
  },

  clickHandler() {
    //this demos a simple client side change

    var value = this.refs.inputData.getDOMNode().value;

    this.setState({
      contents: 'The template was changed through a client side template. Note that the input was not cleared.',
      inputValue: value
    });
  },

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.contents}</p>

        <div style={{margin: '2em 0'}}>
          <strong>Input Value: </strong>
          <span style={{border: '1px #ccc solid', padding: '0.5em 1em'}}>{this.state.inputValue}</span>
        </div>

        <input style={{margin: '1em 0'}} ref='inputData' />
        <button onClick={this.clickHandler}>Submit</button>


        <div style={{display: 'none'}}
          id='props'
          dangerouslySetInnerHTML={{__html: JSON.stringify(this.props)}}>
        </div>

      </div>
    );
  }
});

export default DefaultTemplate;
