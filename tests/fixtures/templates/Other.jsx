import React from 'react';

class OtherTemplate extends React.Component {

    static propTypes = {
        contents: React.PropTypes.any
    };

    render() {
        return (
            <article>
                <h1>Other</h1>
                <section>{this.props.contents}</section>
            </article>
        );
    }
}

export default OtherTemplate;
