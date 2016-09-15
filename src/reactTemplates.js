import React from 'react';
import ReactDOMServer from 'react-dom/server';

export const getComponent = (templatePath) => {
    return require(templatePath).default;
}

export const render = (Component, props = {}, isStatic = true) => {
    if (isStatic){
        // renderToStaticMarkup (React ids removed)
        return ReactDOMServer.renderToStaticMarkup(<Component {...props} />);
    }

    // renderToString (with React ids)
    return ReactDOMServer.renderToString(<Component {...props} />);
}

export default render;
