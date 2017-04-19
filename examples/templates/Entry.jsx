import React from 'react';

class Entry extends React.Component {
  componentDidMount = () => {
    this.setState(this.props);
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
        <h1>{this.state.title}</h1>
        <p>{this.state.contents}</p>

        <div style={{margin: '2em 0'}}>
          <strong>Input Value: </strong>
          <span style={{border: '1px #ccc solid', padding: '0.5em 1em'}}>{this.state.inputValue}</span>
        </div>

        <form onSubmit={this._handleSubmit}>
          <input style={{margin: '1em 0'}} ref={(input) => this.input = input} />
          <button type='submit'>Submit</button>
        </form>

        <div
          style={{display: 'none'}}
          id='props'
          dangerouslySetInnerHTML={{__html: JSON.stringify(this.props)}}
        >
        </div>
      </div>
    )
  }
}

export default Entry;
