
import fs from 'fs';

import {transform as reactTransform} from 'react-tools';
import {transformFileSync as babelTransform} from 'babel';




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



// Ignoring Files
function requireIgnore(){
  return null;
}





export default {
  babelCore: requireBabelCore,
  ignore: requireIgnore,
  reactTools: requireReactTools
};
