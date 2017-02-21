import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import constants from '../constants';
import debug from '../debug';
import readTemplateFile from './readTemplateFile';

const getStrategy = (options) => {
  if (isFunction(options.strategy)) {
    return options.strategy;
  }

  return require('../strategy/reactTemplates').default;
};

const isRendererValid = (renderer) => (
  renderer &&
  isObject(renderer) &&
  isFunction(renderer.then)
);

const applyTemplate = (syntheticFile) => {
  debug(`[${syntheticFile.name}] Applying template`);
  const strategy = getStrategy(syntheticFile.options);

  const renderer = strategy(
    syntheticFile.props,
    syntheticFile.options,
    readTemplateFile(syntheticFile)
  );

  if (!isRendererValid(renderer)) {
    return Promise.reject(constants.INVALID_RENDERER);
  }

  return renderer.then((contents) => {
    syntheticFile.data.contents = new Buffer(contents);
    return syntheticFile;
  });
};

export default applyTemplate;
