import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

const AppDefault = (props, context) => (
  <article>
    <h1>Default</h1>
    <section>{get(context, 'defaultProps.contents', '')}</section>
  </article>
)

AppDefault.contextTypes = {
  defaultProps: PropTypes.object
}

export default AppDefault;
