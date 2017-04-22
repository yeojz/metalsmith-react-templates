import React from 'react';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
import isFunction from 'lodash/isFunction';
import constants from '../../constants';

const getComponent = (templateReader) => {
  if (isFunction(templateReader)) {
    return templateReader();
  }
}

const getMarkup = (Component, props, isStatic) => {
  if (isStatic){
    return renderToStaticMarkup(<Component {...props} />);
  }
  return renderToString(<Component {...props} />);
}

function reactTemplates(props = {}, options = {}, templateReader = null) {
  const Component = getComponent(templateReader);

  if (!Component) {
    return Promise.reject(new Error(constants.INVALID_COMPONENT));
  }
  const markup = getMarkup(Component, props, options.isStatic);
  return Promise.resolve(markup);
}

export default reactTemplates;
