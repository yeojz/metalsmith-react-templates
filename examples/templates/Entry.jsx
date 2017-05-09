/* eslint-disable react/prop-types */

import React from 'react';
import withInitialProps from 'metalsmith-react-templates/withInitialProps';

class Entry extends React.Component {
  state = {}

  componentDidMount = () => {
    this.setState({
      contents: this.props.contents,
      inputValue: this.props.inputValue
    });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    //this demos a simple client side change
    const value = this.input.value;

    this.setState({
      contents: 'Page changed without page reload',
      inputValue: value
    });
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <p>{this.props.contents}</p>

        <div style={{margin: '2em 0'}}>
          <strong>Input Value: </strong>
          <span style={{border: '1px #ccc solid', padding: '0.5em 1em'}}>{this.state.inputValue}</span>
        </div>

        <form onSubmit={this.handleSubmit}>
          <input style={{margin: '1em 0'}} ref={(input) => this.input = input} />
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default withInitialProps(Entry);
