import React from 'react';
import {findDOMNode} from 'react-dom';

const Entry = React.createClass({
    getInitialState() {
        return this.props; //pulled from src/index.html
    },

    _handleSubmit(evt) {
        evt.preventDefault();

        //this demos a simple client side change
        const value = findDOMNode(this.refs.inputData).value;

        this.setState({
            contents: 'Page changed without page reload',
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

                <form onSubmit={this._handleSubmit}>
                    <input style={{margin: '1em 0'}} ref='inputData' />
                    <button type='submit'>Submit</button>
                </form>

                <div style={{display: 'none'}}
                    id='props'
                    dangerouslySetInnerHTML={{__html: JSON.stringify(this.props)}}>
                </div>
            </div>
        );
    }
});

export default Entry;
