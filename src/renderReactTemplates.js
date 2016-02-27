import React from 'react';
import ReactDOMServer from 'react-dom/server';

/**
 *  renderReactTemplates.js
 *
 *  Main rendering function to render contents into
 *  the desired react template
 */
export default (templatePath, props = {}, options = {}) => {

    // Option for isStatic rendering
    // False if we want to do a static first load
    // but dynamic interation subsequently.
    // i.e. React Server side rendering style
    const isStatic = (options.isStatic !== void 0) ? options.isStatic : true;

    try {
        // Initialize the template as a factory
        // and apply the options into the factory.
        const template = require(templatePath);
        const component = React.createElement(template, props);

        let result;

        if (isStatic){
            // renderToStaticMarkup (React ids removed)
            result = ReactDOMServer.renderToStaticMarkup(component);
        } else {
            // renderToString (with React ids)
            result = ReactDOMServer.renderToString(component);
        }

        return {
            err: null,
            result
        };

    } catch (err) {
        return {
            err,
            result: null
        };
    }
};
