import forEach from 'lodash/forEach';
import registerExtensionWithTransformer from '../utils/registerExtensionWithTransformer';
import registerExtensionToIgnore  from '../utils/registerExtensionToIgnore';

function registerExtensions(options) {
  forEach(options.requireTemplateExt, (ext) => {
    registerExtensionWithTransformer(ext, options.tooling);
  });

  forEach(options.requireIgnoreExt, (ext) => {
    registerExtensionToIgnore(ext);
  });
}

export default registerExtensions;
