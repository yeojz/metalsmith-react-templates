import each from 'async/each';
import defaults from 'lodash/defaults';
import forEach from 'lodash/forEach';
import multimatch from 'multimatch';

import registerExtensionWithTransformer from './utils/registerExtensionWithTransformer';
import registerExtensionToIgnore  from './utils/registerExtensionToIgnore';
import renderWithReact from './react-federate';
import renderOptions from './react-federate/options';

const defaultOptions = {
  ...renderOptions,
  pattern: '**/*',
  requireIgnoreExt: [],
  requireTemplateExt: ['.jsx'],
  tooling: {}
}

const registerExtensions = (options) => {
  forEach(options.requireTemplateExt, (ext) => {
    registerExtensionWithTransformer(ext, options.tooling);
  });

  forEach(options.requireIgnoreExt, (ext) => {
    registerExtensionToIgnore(ext);
  });
};

const reactTemplateProcessor = (options) => (files, metalsmith, done) => {
  const matchedFiles = multimatch(Object.keys(files), options.pattern);
  const render = renderWithReact(files, metalsmith, options);

  each(matchedFiles, render, done);
};

export default (options = {}) => {
  defaults(options, defaultOptions);
  registerExtensions(options);

  return reactTemplateProcessor(options);
};
