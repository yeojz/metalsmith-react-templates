import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import get from 'lodash/get';
import constants from '../constants';
import debug from '../debug';
import readTemplateFile from './readTemplateFile';

const getStrategy = (options) => {
  if (isFunction(options.strategy)) {
    return options.strategy;
  }

  const strategy = require('../strategy/react');
  return get(strategy, 'default', strategy);
};

const isRendererValid = (renderer) => (
  renderer
  && isObject(renderer)
  && isFunction(renderer.then)
);

function applyTemplate(syntheticFile) {
  debug(`[${syntheticFile.name}] Applying template`);
  const strategy = getStrategy(syntheticFile.options);

  const renderer = strategy(
    syntheticFile.props,
    syntheticFile.options,
    readTemplateFile(syntheticFile)
  );

  if (!isRendererValid(renderer)) {
    return Promise.reject(new Error(constants.INVALID_RENDERER));
  }

  return renderer.then((contents) => {
    syntheticFile.data.contents = new Buffer(contents);
    return syntheticFile;
  });
}

export default applyTemplate;
