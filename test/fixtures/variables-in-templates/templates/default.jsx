import React from 'react';

const DefaultTemplate = React.createClass({
    propTypes: {
        contents: React.PropTypes.any,
        misc: React.PropTypes.any,
        title: React.PropTypes.any
    },
    render() {
        return (
            <div>
                <span>{this.props.title}</span>
                <span>{this.props.misc}</span>
                <span>{this.props.contents}</span>
            </div>
        );
    }
});

export default DefaultTemplate;
