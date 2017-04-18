import React from 'react';
import PropTypes from 'prop-types';

class VariableTemplate extends React.Component {
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

VariableTemplate.propTypes = {
  contents: PropTypes.any,
  misc: PropTypes.any,
  title: PropTypes.any
};

export default VariableTemplate;
