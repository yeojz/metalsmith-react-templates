
import fs from 'fs';

import ReactTools from 'react-tools';
import BabelCore from 'babel-core';




/**
 * Extensions for `require` to accept jsx
 */

// Runs react-tools transform against the file.
function requireReactTools(tooling = {harmony: true}, module, filename) {
  let content = fs.readFileSync(filename, 'utf8');
  let compiled = ReactTools.transform(content, tooling);

  return module._compile(compiled, filename);
}


// Runs babel transform
function requireBabelCore(tooling = {}, module, filename) {
  let compiled = BabelCore.transformFileSync(filename, tooling).code;
  return module._compile(compiled, filename);
}






export default {
  babelCore: requireBabelCore,
  reactTools: requireReactTools
};
