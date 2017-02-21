import each from 'async/each';
import defaults from 'lodash/defaults';
import forEach from 'lodash/forEach';
import multimatch from 'multimatch';
import registerExtensionWithTransformer from '../utils/registerExtensionWithTransformer';
import registerExtensionToIgnore  from '../utils/registerExtensionToIgnore';
import processor from './processor';
import defaultOptions from './options';
import backwardCompat from './backwardCompat'

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
  const render = processor(files, metalsmith, options);

  each(matchedFiles, render, done);
};

export default (options = {}) => {

  backwardCompat.options(options);

  defaults(options, defaultOptions.plugin);
  registerExtensions(options);

  return reactTemplateProcessor(options);
};
