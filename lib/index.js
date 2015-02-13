
var debug = require('debug')('metalsmith-react-templates');

var each = require('async').each,
    extend = require('extend'),
    fs = require('fs'),
    omit = require('lodash.omit');


/**
 * Expose `plugin`.
 */

module.exports = plugin;


/**
 * Settings.
 */

var settings = ['directory', 'defaultTemplate', 'baseFile'];


/**
 * Extensions for `require` to accept jsx
 * Runs react-tools.transform against the file. 
 */

function requireReact(module, filename) {

  var ReactTools = require('react-tools');

  var content = fs.readFileSync(filename, 'utf8');
  var compiled = ReactTools.transform(content, {harmony: true});

  return module._compile(compiled, filename);
}


/**
 * Main rendering function for React
 */
 
function renderReactTemplate(str, options, fn){

  // Ensure JSX is transformed on require
  if (!require.extensions['.jsx']) require.extensions['.jsx'] = requireReact;

  // React Import
  var engine = require('react');

  // Assign HTML 
  var baseFile = options.baseFile;
  delete options.baseFile;

  // Option for nonStatic rendering
  // Usually if first load is dynamic
  var isNonStatic = options.nonStatic;
  delete options.nonStatic;

  // Create Element and Pass options in
  var factory = engine.createFactory(require(str));
  var parsed = new factory(options);

  try {
  
    var content = (isNonStatic) ? engine.renderToString(parsed) : engine.renderToStaticMarkup(parsed);

    // If baseFile specified, insert content into the file.
    if (baseFile){
      var baseStr = fs.readFileSync(baseFile, 'utf8');
      content = baseStr.replace(/{{content}}/g, content);
    }

    fn(null, content);
  } catch (err) {
    fn(err);
  }
}


/**
 * Metalsmith plugin to which uses react as template
 * Adapted from metalsmith-templates
 *
 * @return {Function}
 */

function plugin(opts){
  opts = opts || {};
  

  var dir = opts.directory || 'templates';
  var def = opts.defaultTemplate || 'default.jsx';
  var baseFile  = opts.baseFile || false;
  var params = omit(opts, settings);


  // Rendering Function. 
  return function(files, metalsmith, done){
    var metadata = metalsmith.metadata();


    // Check Parameters
    function check(file){
      var data = files[file];
      var tmpl = data.template || def;

      if (!tmpl) return false;
      return true;
    }


    // Iterating and changing contents to string
    Object.keys(files).forEach(function(file){
      if (!check(file)) return;
      debug('stringifying file: %s', file);
      var data = files[file];
      data.contents = data.contents.toString();
    });


    // Converting all files
    each(Object.keys(files), convert, done);


    // Running all files against the renderer.
    function convert(file, done){
      if (!check(file)) return done();
      debug('converting file: %s', file);

      var data = files[file];
      var clone = extend({}, params, metadata, data);

      var str = metalsmith.path(dir, data.template || def);

      if(baseFile) clone.baseFile = metalsmith.path(dir, baseFile);

      renderReactTemplate(str, clone, function(err,str){
        if (err) return done(err);
        data.contents = new Buffer(str);
        debug('converted file: %s', file);
        done();
      });

    } // convert

  };  // end function return

}