import merge from 'lodash/merge';
import {match} from 'react-router';
import pMatch from '../../utils/pMatch';
import reactTemplates from '../reactTemplates';
import Provider from './Provider';

export const INVALID_RENDER_PROPS = 'No route found for this location';
export const REDIRECT_LOCATION = 'Redirection detected';

const routeMatch = pMatch(match);

function reactRouterTemplates(props = {}, options = {}) {
  const config = {
    location: props.location,
    routes: options.routes,
  }

  const renderProps = {
    defaultProps: props.defaultProps
  }

  return routeMatch(config)
    .then((matched) => {
      if (matched.redirectLocation) {
        throw new Error(REDIRECT_LOCATION)
      }
      if (!matched.renderProps) {
        throw new Error(INVALID_RENDER_PROPS)
      }
      return matched;
    })
    .then((matched) => (
      merge(renderProps, matched.renderProps)
    ))
    .then((renderProps) => (
      reactTemplates(renderProps, options, () => Provider)
    ));
}

export default reactRouterTemplates;
