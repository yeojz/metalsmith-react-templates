import merge from 'lodash/merge';
import {match} from 'react-router';
import constants from '../../constants';
import reactTemplates from '../react';
import Provider from './Provider';

function pMatch(config) {
  return new Promise((resolve, reject) => {
    match(config, (err, redirectLocation, renderProps) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({redirectLocation, renderProps});
    })
  });
}

function v3(props = {}, options = {}) {
  const config = {
    location: props.location,
    routes: options.routes,
  }

  const renderProps = {
    defaultProps: props.defaultProps
  }

  return pMatch(config)
    .then((matched) => {
      if (matched.redirectLocation) {
        throw new Error(constants.REDIRECT_LOCATION)
      }
      if (!matched.renderProps) {
        throw new Error(constants.INVALID_PROPS)
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

export default v3;
