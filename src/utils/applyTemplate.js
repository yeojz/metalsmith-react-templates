import isFunction from 'lodash/isFunction';
import constants from '../constants';
import debug from '../debug';
import readTemplateFile from './readTemplateFile';

const getStrategy = (options) => {
  if (isFunction(options.strategy)) {
    return options.strategy;
  }

  if (options.strategy === 'react') {
    return require('../strategy/reactTemplates').default;
  }

  return void 0;
};

const applyTemplate = (syntheticFile) => {
  debug(`[${syntheticFile.name}] Applying template`);
  const strategy = getStrategy(syntheticFile.options);

  if (!strategy) {
    return Promise.reject(constants.NO_STRATEGY_FOUND);
  }

  const renderer = strategy(
    syntheticFile.props,
    syntheticFile.options,
    readTemplateFile(syntheticFile)
  );

  return renderer.then((contents) => {
    syntheticFile.data.contents = new Buffer(contents);
    return syntheticFile;
  });
};

export default applyTemplate;
