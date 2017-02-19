import React from 'react';
import ReactDOMServer from 'react-dom/server';
import isFunction from 'lodash/isFunction';
import constants from '../constants';

function getComponent(templateReader) {
  if (isFunction(templateReader)) {
      return templateReader();
  }
  return templateReader;
}

function getMarkup(Component, props, isStatic) {
  if (isStatic){
    return ReactDOMServer.renderToStaticMarkup(<Component {...props} />);
  }

  return ReactDOMServer.renderToString(<Component {...props} />);
}

function reactTemplates(props = {}, options = {}, templateReader = null) {
  const Component = getComponent(templateReader);

  if (!Component) {
    return Promise.reject(constants.INVALID_COMPONENT);
  }

  const markup = getMarkup(Component, props, options.isStatic);
  return Promise.resolve(markup);
}

export default reactTemplates;
