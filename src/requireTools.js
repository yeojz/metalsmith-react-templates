/**
 *  requireTools.js
 *
 *  Methods for overriding default require behaviour.
 */

import {transformFileSync as babelTransform} from 'babel-core';


// Extensions for `require` to accept jsx
// Runs babel transform
function requireBabelCore(tooling = {}, module, filename) {
  let compiled = babelTransform(filename, tooling).code;
  return module._compile(compiled, filename);
}


// Ignoring Files
function requireIgnore(){
  return null;
}



export default {
  babelCore: requireBabelCore,
  ignore: requireIgnore
};
