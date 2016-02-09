import React from 'react';

const DefaultTemplate = React.createClass({
    propTypes: {
        contents: React.PropTypes.any
    },
    render() {
        return (
            <div>{this.props.contents}</div>
        );
    }
});

export default DefaultTemplate;

