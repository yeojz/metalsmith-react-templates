import React from 'react';
import ReactDOMServer from 'react-dom/server';

/**
 *  renderReactTemplates.js
 *
 *  Main rendering function to render contents into
 *  the desired react template
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
            content = ReactDOMServer.renderToStaticMarkup(component);
        } else {
            // renderToString (with React ids)
            content = ReactDOMServer.renderToString(component);
        }

        callback(null, content);

    } catch (err) {
        callback(err);
    }
};
