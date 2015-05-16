
import fs from 'fs';

import {transform as reactTransform} from 'react-tools';
import {transformFileSync as babelTransform} from 'babel-core';




/**
 * Extensions for `require` to accept jsx
 */

// Runs react-tools transform against the file.
function requireReactTools(tooling = {harmony: true}, module, filename) {
  let content = fs.readFileSync(filename, 'utf8');
  let compiled = reactTransform(content, tooling);

  return module._compile(compiled, filename);
}


// Runs babel transform
function requireBabelCore(tooling = {}, module, filename) {
  let compiled = babelTransform(filename, tooling).code;
  return module._compile(compiled, filename);
}






export default {
  babelCore: requireBabelCore,
  reactTools: requireReactTools
};
