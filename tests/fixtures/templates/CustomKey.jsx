import React from 'react';
import PropTypes from 'prop-types';

class DefaultTemplate extends React.Component {
  render() {
    return (
      <article>
        <h1>Default</h1>
        <section>{this.props.customKey.contents}</section>
      </article>
    );
  }
}

DefaultTemplate.propTypes = {
  customKey: PropTypes.any
};

export default DefaultTemplate;
