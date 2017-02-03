import React, {PropTypes} from 'react';

const Functional = (props) => (
  <article>
    <h1>Default</h1>
    <section>{props.contents}</section>
  </article>
);

Functional.propTypes = {
  contents: PropTypes.any
}

export default Functional;
