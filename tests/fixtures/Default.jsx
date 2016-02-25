import React from 'react';

class DefaultTemplate extends React.Component {

    static propTypes = {
        contents: React.PropTypes.any
    };

    render() {
        return (
            <div>{this.props.contents}</div>
        );
    }
}


export default DefaultTemplate;
