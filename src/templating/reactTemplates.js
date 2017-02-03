import React from 'react';
import ReactDOMServer from 'react-dom/server';
import constants from '../constants';

const reactTemplates = (Component, props = {}, options = {}) => {
  if (!Component) {
    throw new Error(constants.INVALID_COMPONENT);
  }

  if (options.isStatic){
      return ReactDOMServer.renderToStaticMarkup(<Component {...props} />);
  }

  return ReactDOMServer.renderToString(<Component {...props} />);
}

export default reactTemplates;
