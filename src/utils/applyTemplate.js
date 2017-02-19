import debug from '../debug';
import isFunction from 'lodash/isFunction';

const getRenderer = (options) => {
  if (isFunction(options.strategy)) {
    return options.strategy;
  }

  return require('../strategy/reactTemplates').default;
};

const applyTemplate = (syntheticFile) => {
  debug(`[${syntheticFile.name}] Applying template`);
  const renderer = getRenderer(syntheticFile.options);

  const contents = renderer(
    syntheticFile.template,
    syntheticFile.props,
    syntheticFile.options
  );

  syntheticFile.data.contents = new Buffer(contents);
  return syntheticFile;
};

export default applyTemplate;
