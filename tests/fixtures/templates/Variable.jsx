import React from 'react';

class VariableTemplate extends React.Component {

    static propTypes = {
        contents: React.PropTypes.any,
        misc: React.PropTypes.any,
        title: React.PropTypes.any
    };

    render() {
        return (
            <article>
                <h1>Variable</h1>
                <section>{this.props.title}</section>
                <section>{this.props.misc}</section>
                <section>{this.props.contents}</section>
            </article>
        );
    }
}


export default VariableTemplate;
