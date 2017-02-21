import {match, RouterContext} from 'react-router';
import reactTemplates from './reactTemplates';
import pMatch from '../utils/pMatch';

const routeMatch = pMatch(match);

function reactRouterTemplates(props = {}, options = {}) {
  const config = {
    location: props.location,
    routes: options.routes,
  }

  return routeMatch(config)
    .then((matched) => ({
      ...props.renderProps,
      ...matched.renderProps
    }))
    .then((renderProps) => (
      reactTemplates(renderProps, options, () => RouterContext)
    ));
}

export default reactRouterTemplates;
