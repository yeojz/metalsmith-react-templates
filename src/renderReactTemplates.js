import React from 'react';

/**
 * Main rendering function for React
 */
export default (templatePath, props = {}, options = {}, callback = () => {}) => {

  // Option for isStatic rendering
  // False if we want to do a static first load
  // but dynamic interation subsequently.
  // i.e. React Server side rendering style
  const isStatic = (options.isStatic !== void 0) ? options.isStatic : true;

  // Initialize the template as a factory
  // and apply the options into the factory.
  const template = require(templatePath);
  const component = React.createElement(template, props);

  try {
    let content;

    if (isStatic){
      // renderToStaticMarkup (React ids removed)
      content = React.renderToStaticMarkup(component);
    } else {
      // renderToString (with React ids)
      content = React.renderToString(component);
    }

    callback(null, content);

  } catch (err) {
    callback(err);
  }
};


