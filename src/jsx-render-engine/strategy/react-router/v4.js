import React from 'react';
import {renderToStaticMarkup, renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router';
import constants from '../../constants';
import Provider from './Provider';

function getRouter(location, context, defaultProps, routes) {
  return (
    <StaticRouter location={location} context={context}>
      <Provider defaultProps={defaultProps}>
        {routes}
      </Provider>
    </StaticRouter>
  );
}

function v4reactRouterTemplates(props = {}, options = {}) {

  let context = {};

  const router = getRouter(
    props.location,
    context,
    props.defaultProps,
    options.routes
  );

  const markup = (options.isStatic)
    ? renderToStaticMarkup(router)
    : renderToString(router);

  if (!markup) {
     return Promise.reject(constants.INVALID_MARKUP);
  }

  if (context.url) {
    return Promise.reject(constants.REDIRECT_LOCATION);
  }

  return Promise.resolve(markup);
}

export default v4reactRouterTemplates;
