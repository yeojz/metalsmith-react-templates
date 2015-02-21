
var debug = require('debug')('metalsmith-react-templates');

var each = require('async').each,
    extend = require('extend'),
    fs = require('fs'),
    match = require('multimatch'),
    omit = require('lodash.omit'),
    path = require('path');


/**
 * Expose `plugin`.
 */

module.exports = plugin;


/**
 * Settings.
 */

var settings = ['directory', 'defaultTemplate', 'pattern', 'baseFile'];


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

  // React Import
  var engine = require('react');

  // Option for nonStatic rendering
  // Usually if first load is dynamic
  var isNonStatic = options.nonStatic;
  delete options.nonStatic;

  // Create Element and Pass options in
  var Factory = engine.createFactory(require(str));
  var parsed = new Factory(options);

  try {
  
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

  for (var k in data){
    if (data.hasOwnProperty(k)){
      exp = '{{'+k+'}}';
      regex = new RegExp(exp, 'g');
      str = str.replace(regex, data[k]);
    }
  }

  data.contents = str;
  return data;
}


/**
 * Metalsmith plugin to which uses react as template
 */

function plugin(opts){
  opts = opts || {};
  

  var dir = opts.directory || 'templates';
  var def = opts.defaultTemplate || 'default.jsx';
  var baseFile  = opts.baseFile || false;
  var pattern = opts.pattern;
  var params = omit(opts, settings);
  var html = (opts.html === undefined) ? true : opts.html;


  // Rendering Function. 
  return function(files, metalsmith, done){

    var metadata = metalsmith.metadata();

    // Check Parameters
    function check(file){
      var data = files[file];
      var tmpl = data.rtemplate || def;

      if (pattern && !match(file, pattern)[0]){
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

      debug('stringifying file: %s', file);

      var data = files[file];
      data.contents = data.contents.toString();
    });


    // Converting all files
    each(Object.keys(files), convert, done);


    // Running all files against the renderer.
    function convert(file, done){
      if (!check(file)){
        return done();
      }

      debug('converting file: %s', file);

      var data = files[file];
      var clone = extend({}, params, metadata, data);

      var str = metalsmith.path(dir, data.rtemplate || def);


      if(baseFile){
        baseFile = metalsmith.path(dir, baseFile);
      }


      // Render it now.
      renderReactTemplate(str, clone, function(err, str){
        if (err){
          return done(err);
        }

        data.contents = new Buffer(str);

        // If baseFile specified, insert content into the file.
        if (baseFile){
          var baseStr = fs.readFileSync(baseFile, 'utf8');
          data = tmpl(baseStr, data);
        }


        // If html option, rename files to html
        if (html){
          
          var fileDir = path.dirname(file);
          var fileName = path.basename(file, path.extname(file)) + '.html';
          if ('.' !== fileDir){
            fileName = fileDir + '/' + fileName;
          }

          debug('renaming file: %s -> %s', file, fileName);

          delete files[file];
          files[fileName] = data;
        }

        debug('saved file: %s', file);
        done();
      });

    } // convert

  };  // end function return

}