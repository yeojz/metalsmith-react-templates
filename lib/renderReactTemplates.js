'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _React = require('react');

var _React2 = _interopRequireDefault(_React);

var _requireTools = require('./requireTools');

var _requireTools2 = _interopRequireDefault(_requireTools);

/**
 * Main rendering function for React
 */

exports['default'] = function (templatePath) {
  var props = arguments[1] === undefined ? {} : arguments[1];
  var options = arguments[2] === undefined ? {} : arguments[2];
  var callback = arguments[3] === undefined ? function () {} : arguments[3];

  // Ensure .jsx transformation
  if (!require.extensions['.jsx']) {
    var tooling = options.tooling;

    if (options.babel) {
      require.extensions['.jsx'] = _requireTools2['default'].babelCore.bind(null, tooling);
    } else {
      require.extensions['.jsx'] = _requireTools2['default'].reactTools.bind(null, tooling);
    }
  }

  // Option for nonStatic rendering
  // Usually used if we want to do a static first load
  // but dynamic interation subsequently.
  // i.e. React Server side rendering style
  var isNonStatic = options.nonStatic;

  // Initialize the template as a factory
  // and apply the options into the factory.
  var tempate = require(templatePath);
  var component = _React2['default'].createElement(tempate, props);

  try {
    var content = undefined;

    if (isNonStatic) {
      // renderToString (with React ids)
      content = _React2['default'].renderToString(component);
    } else {
      // renderToStaticMarkup (React ids removed)
      content = _React2['default'].renderToStaticMarkup(component);
    }

    callback(null, content);
  } catch (err) {
    callback(err);
  }
};

module.exports = exports['default'];