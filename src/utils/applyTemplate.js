import debug from '../debug';
import isFunction from 'lodash/isFunction';
import readTemplateFile from './readTemplateFile';

const getStrategy = (options) => {
  if (isFunction(options.strategy)) {
    return options.strategy;
  }

  return require('../strategy/reactTemplates').default;
};

const applyTemplate = (syntheticFile) => {
  debug(`[${syntheticFile.name}] Applying template`);
  const strategy = getStrategy(syntheticFile.options);

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
