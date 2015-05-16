'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ReactTools = require('react-tools');

var _ReactTools2 = _interopRequireDefault(_ReactTools);

var _BabelCore = require('babel-core');

var _BabelCore2 = _interopRequireDefault(_BabelCore);

/**
 * Extensions for `require` to accept jsx
 */

// Runs react-tools transform against the file.
function requireReactTools(_x, module, filename) {
  var tooling = arguments[0] === undefined ? { harmony: true } : arguments[0];

  var content = _fs2['default'].readFileSync(filename, 'utf8');
  var compiled = _ReactTools2['default'].transform(content, tooling);

  return module._compile(compiled, filename);
}

// Runs babel transform
function requireBabelCore(_x2, module, filename) {
  var tooling = arguments[0] === undefined ? {} : arguments[0];

  var compiled = _BabelCore2['default'].transformFileSync(filename, tooling).code;
  return module._compile(compiled, filename);
}

exports['default'] = {
  babelCore: requireBabelCore,
  reactTools: requireReactTools
};
module.exports = exports['default'];