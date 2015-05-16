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

var _naiveTemplates = require('./naiveTemplates');

var _naiveTemplates2 = _interopRequireDefault(_naiveTemplates);

var _renderReactTemplates = require('./renderReactTemplates');

var _renderReactTemplates2 = _interopRequireDefault(_renderReactTemplates);

var debug = _debugCore2['default']('metalsmith-react-templates');

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

      _renderReactTemplates2['default'](templatePath, props, options, function (err, result) {

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

          data = _naiveTemplates2['default'](baseFileContent, data);
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