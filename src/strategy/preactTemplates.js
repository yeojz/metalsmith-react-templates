/** @jsx h */
import {h} from 'preact';
import isFunction from 'lodash/isFunction';

import render from 'preact-render-to-string';
import constants from '../constants';

function getComponent(templateReader) {
  if (isFunction(templateReader)) {
      return templateReader();
  }
  return templateReader;
}

function preactTemplates(props = {}, options = {}, templateReader = null) {
  const Component = getComponent(templateReader);

  if (!Component) {
    return Promise.reject(constants.INVALID_COMPONENT);
  }

  const markup = render(<Component {...props} />);
  return Promise.resolve(markup);
}

export default preactTemplates;
