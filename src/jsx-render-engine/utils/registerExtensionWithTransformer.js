import {transformFileSync} from 'babel-core';

const babelify = (tooling = {}) => (module, filename) => {
  let compiled = transformFileSync(filename, tooling).code;
  return module._compile(compiled, filename);
};

const registerExtensionWithTransformer = (ext, tooling) => {
  if (require.extensions && !require.extensions[ext]) {
    require.extensions[ext] = babelify(tooling);
  }
};

export default registerExtensionWithTransformer;
