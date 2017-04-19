import React from 'react';
import PropTypes from 'prop-types';

class OtherTemplate extends React.Component {
  render() {
    return (
      <article>
        <h1>Other</h1>
        <section>{this.props.contents}</section>
      </article>
    );
  }
}

OtherTemplate.propTypes = {
  contents: PropTypes.any
};

export default OtherTemplate;
