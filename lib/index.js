'use strict';

var debug = require('debug')('metalsmith-react-templates');

var each = require('async').each,
    extend = require('extend'),
    fs = require('fs'),
    match = require('multimatch'),
    omit = require('lodash.omit'),
    path = require('path');


/**
 * Settings.
 */

var settings = ['directory', 'defaultTemplate', 'pattern', 'baseFile', 'preserve'];


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
  if (!require.extensions['.jsx']) {
    require.extensions['.jsx'] = requireReact;
  }

  // Import React as the engine
  var engine = require('react');

  // Option for nonStatic rendering
  // Usually used if we want to do a static first load
  // but dynamic interation subsequently.
  // i.e. React Server side rendering style
  var isNonStatic = options.nonStatic;
  delete options.nonStatic;

  // Initialize the template as a factory 
  // and apply the options into the factory.
  var Factory = engine.createFactory(require(str));
  var parsed = new Factory(options);

  try {
  
    // Render to Static Markup (React ids removed)
    // Render to String (with React ids)
    var content = (isNonStatic) ? engine.renderToString(parsed) : engine.renderToStaticMarkup(parsed);

    fn(null, content);

  } catch (err) {
    fn(err);
  }
}


/**
 *  Simple Micro Templating Function
 */

function tmpl(str, data){
  var exp,
      regex;

  // Iterates through the keys in file object
  // and interpolate / replace {{key}} with it's value
  for (var k in data){
    if (data.hasOwnProperty(k)){
      exp = '{{'+k+'}}';
      regex = new RegExp(exp, 'g');
      str = str.replace(regex, data[k]);
    }
  }

  // Assign the final result back into the contents field
  data.contents = new Buffer(str);

  return data;
}


/**
 * Core of the Metalsmith plugin which uses react as template
 */

function plugin(opts){
  opts = opts || {};
  

  var dir = opts.directory || 'templates';
  var def = opts.defaultTemplate || 'default.jsx';
  var baseFile  = opts.baseFile || false;
  var pattern = opts.pattern || null;
  var preserve = opts.preserve || null;
  var params = omit(opts, settings);
  var html = (opts.html === undefined) ? true : opts.html;


  // Rendering Function. 
  return function(files, metalsmith, done){

    var metadata = metalsmith.metadata();

    // Check Parameters
    function check(file){
      var data = files[file];
      var tmpl = data.rtemplate || def;

      if (pattern !== null && !match(file, pattern)[0]){
        return false;
      }

      if (!tmpl){
        return false;
      }

      return true;
    }


    // Iterating and changing contents to string
    Object.keys(files).forEach(function(file){
      
      if (!check(file)){
        return;
      }

      debug('Converting contents to string: %s', file);


      // Stringify Contents
      var data = files[file];
      data.contents = data.contents.toString();


      // if opt.preserve is set
      // preserve the raw, not templated content
      if (preserve !== null){

        debug('Preserving untouched contents: %s', file);

        data.rawContents = data.contents;
      }

    });


    // Running all files against the renderer.
    function convert(file, done){
      
      if (!check(file)){
        return done();
      }

      debug('Starting conversion: %s', file);

      var data = files[file];
      var clone = extend({}, params, metadata, data);

      var str = metalsmith.path(dir, data.rtemplate || def);


      // Resolving the baseFile option to path.
      if(baseFile){
        baseFile = metalsmith.path(dir, baseFile);
      }


      // Start the process of applying templates
      renderReactTemplate(str, clone, function(err, str){
        
        if (err){
          return done(err);
        }

        data.contents = new Buffer(str);


        // If `baseFile` is specified, 
        // insert content into the file.
        if (baseFile){
          debug('Applying baseFile to contents: %s', file);

          var baseStr = fs.readFileSync(baseFile, 'utf8');
          data = tmpl(baseStr, data);
        }

        // if `html` is set
        // Rename markdown files to html
        if (html){
          
          var fileDir = path.dirname(file);
          var fileName = path.basename(file, path.extname(file)) + '.html';
          if ('.' !== fileDir){
            fileName = fileDir + '/' + fileName;
          }

          debug('Renaming file: %s -> %s', file, fileName);

          delete files[file];
          files[fileName] = data;
        }

        debug('Saved file: %s', file);
        done();
      });

    } // convert


    // Iterate and convert all files in object.
    each(Object.keys(files), convert, done);

  };  // end function return

} // plugin



/**
 * Expose `plugin`.
 */

module.exports = plugin;

