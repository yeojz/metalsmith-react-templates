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

const getHydrator = (options) => {
  if (isFunction(options.hydrator)) {
    return options.hydrator;
  }

  return (originalData, renderedContent) => ({
    ...originalData,
    contents: new Buffer(renderedContent)
  });
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
    const hydrate = getHydrator(syntheticFile.options);
    syntheticFile.data = hydrate(syntheticFile.data, contents);
    return syntheticFile;
  });
}

export default applyTemplate;
