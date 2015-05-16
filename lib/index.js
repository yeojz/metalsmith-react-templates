'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _debugCore = require('debug');

var _debugCore2 = _interopRequireDefault(_debugCore);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _multimatch = require('multimatch');

var _multimatch2 = _interopRequireDefault(_multimatch);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _each = require('async');

var _React = require('react');

var _React2 = _interopRequireDefault(_React);

var _ReactTools = require('react-tools');

var _ReactTools2 = _interopRequireDefault(_ReactTools);

var _BabelCore = require('babel-core');

var _BabelCore2 = _interopRequireDefault(_BabelCore);

var debug = _debugCore2['default']('metalsmith-react-templates');

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
function requireReactBabel(_x2, module, filename) {
  var tooling = arguments[0] === undefined ? {} : arguments[0];

  var compiled = _BabelCore2['default'].transformFileSync(filename, tooling).code;
  return module._compile(compiled, filename);
}

/**
 *  Simple Micro Templating Function
 */
function tmpl(str, data) {

  // Iterates through the keys in file object
  // and interpolate / replace {{key}} with it's value
  for (var k in data) {
    if (data.hasOwnProperty(k)) {
      var exp = '{{' + k + '}}';
      var regex = new RegExp(exp, 'g');

      str = str.replace(regex, data[k]);
    }
  }

  // Assign the final result back into the contents field
  data.contents = new Buffer(str);

  return data;
}

/**
 * Main rendering function for React
 */
function renderReactTemplate(templatePath) {
  var props = arguments[1] === undefined ? {} : arguments[1];
  var options = arguments[2] === undefined ? {} : arguments[2];
  var callback = arguments[3] === undefined ? function () {} : arguments[3];

  // Ensure .jsx transformation
  if (!require.extensions['.jsx']) {
    var tooling = options.tooling;

    if (options.babel) {
      require.extensions['.jsx'] = requireReactBabel.bind(null, tooling);
    } else {
      require.extensions['.jsx'] = requireReactTools.bind(null, tooling);
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
}

/**
 *  Plugin Exports
 */

exports['default'] = function () {
  var options = arguments[0] === undefined ? {} : arguments[0];
  var _options$baseFile = options.baseFile;
  var baseFile = _options$baseFile === undefined ? null : _options$baseFile;
  var _options$defaultTemplate = options.defaultTemplate;
  var defaultTemplate = _options$defaultTemplate === undefined ? 'default.jsx' : _options$defaultTemplate;
  var _options$directory = options.directory;
  var directory = _options$directory === undefined ? 'templates' : _options$directory;
  var _options$html = options.html;
  var html = _options$html === undefined ? true : _options$html;
  var _options$pattern = options.pattern;
  var pattern = _options$pattern === undefined ? '**/*' : _options$pattern;
  var _options$preserve = options.preserve;
  var preserve = _options$preserve === undefined ? false : _options$preserve;

  return function (files, metalsmith, done) {
    var metadata = metalsmith.metadata();

    _each.each(_multimatch2['default'](Object.keys(files), pattern), function (file, callback) {
      var data = files[file];

      // Prepare Props
      debug('Preparing Props: %s', file);
      var props = _objectAssign2['default']({}, data, metadata, {
        contents: data.contents.toString()
      });

      // if opt.preserve is set
      // preserve the raw, not templated content
      if (preserve) {
        debug('Preserving untouched contents: %s', file);
        data.rawContents = data.contents;
      }

      // Start Conversion Process
      debug('Starting conversion: %s', file);
      var templatePath = metalsmith.path(directory, data.rtemplate || defaultTemplate);

      renderReactTemplate(templatePath, props, options, function (err, result) {

        if (err) {
          return callback(err);
        }

        // Buffer back the result
        data.contents = new Buffer(result);

        // If `baseFile` is specified,
        // insert content into the file.
        if (baseFile) {
          debug('Applying baseFile to contents: %s', file);
          var baseFilePath = metalsmith.path(directory, baseFile);
          var baseFileContent = _fs2['default'].readFileSync(baseFilePath, 'utf8');

          data = tmpl(baseFileContent, data);
        }

        // if `html` is set
        // Rename markdown files to html
        if (html) {
          var fileDir = _path2['default'].dirname(file);
          var fileName = _path2['default'].basename(file, _path2['default'].extname(file)) + '.html';

          if (fileDir !== '.') {
            fileName = fileDir + '/' + fileName;
          }

          debug('Renaming file: %s -> %s', file, fileName);

          delete files[file];
          files[fileName] = data;
        }

        // Complete
        debug('Saved file: %s', file);
        callback();
      }); // renderReactTemplate
    }, done); // Each
  }; // Return
};

// export
module.exports = exports['default'];
