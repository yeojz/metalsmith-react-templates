import React from 'react';
import ReactDOMServer from 'react-dom/server';

export default (templatePath, props = {}, isStatic = true) => {

    // Initialize the template as a factory
    // and apply the options into the factory.
    const template = require(templatePath).default;
    const component = React.createElement(template, props);

    if (isStatic){
        // renderToStaticMarkup (React ids removed)
        return ReactDOMServer.renderToStaticMarkup(component);
    }

    // renderToString (with React ids)
    return ReactDOMServer.renderToString(component);
}
