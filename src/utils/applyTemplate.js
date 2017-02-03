import debug from '../debug';

const getRenderer = (options) => {
  if (options.renderer === 'react') {
    return require('../templating/reactTemplates').default;
  }
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
