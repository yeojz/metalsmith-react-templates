import React, {PropTypes} from 'react';

class DefaultTemplate extends React.Component {
  render() {
    return (
      <article>
        <h1>Default</h1>
        <section>{this.props.contents}</section>
      </article>
    );
  }
}

DefaultTemplate.propTypes = {
  contents: PropTypes.any
};

export default DefaultTemplate;
