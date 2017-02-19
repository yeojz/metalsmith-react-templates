import {match, RouterContext} from 'react-router';
import reactTemplates from './reactTemplates';

function matchWithPromise(config) {
  return new Promise((resolve, reject) => {
    match(config, (err, redirectLocation, renderProps) => {
      if (err) {
        reject(err);
        return;
      }

      resolve({redirectLocation, renderProps});
    });
  });
}

function reactRouterTemplates(props = {}, options = {}) {
  return matchWithPromise({
      location: props.location,
      routes: options.routes,
    })
    .then((matched) => ({
      ...props.renderProps,
      ...matched.renderProps
    }))
    .then((renderProps) => (
      reactTemplates(renderProps, options, () => RouterContext)
    ));
}

export default reactRouterTemplates;
