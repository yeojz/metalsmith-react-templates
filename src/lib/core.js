import each from 'async/each';
import defaults from 'lodash/defaults';
import multimatch from 'multimatch';

import backwardCompat from './backwardCompat';
import Engine, {registerExtensions} from '../jsx-render-engine';

const pluginOptions = {
  pattern: '**/*'
}

const reactTemplateProcessor = (options) => (files, metalsmith, done) => {
  const matchedFiles = multimatch(Object.keys(files), options.pattern);
  const engine = new Engine(files, metalsmith, options);

  each(matchedFiles, engine.getInstance(), done);
};

export default (options = {}) => {
  backwardCompat.options(options);
  defaults(options, pluginOptions);

  registerExtensions(options);

  return reactTemplateProcessor(options);
};
