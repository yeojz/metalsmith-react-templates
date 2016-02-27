import React from 'react';

class DefaultTemplate extends React.Component {

    static propTypes = {
        contents: React.PropTypes.any
    };

    render() {
        return (
            <article>
                <h1>Default</h1>
                <section>{this.props.contents}</section>
            </article>
        );
    }
}

export default DefaultTemplate;
