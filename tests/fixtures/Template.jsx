import React from 'react';

class Template extends React.Component {

    static propTypes = {
        contents: React.PropTypes.any
    };

    render() {
        return (
            <article>
                <h2>Template</h2>
                <section>{this.props.contents}</section>
            </article>
        );
    }
}


export default Template;
