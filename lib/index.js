
var debug = require('debug')('metalsmith-react');

var fs = require('fs');

var each = require('async').each;
var extend = require('extend');
var omit = require('lodash.omit');
var template = require('lodash.template');


/**
 * Expose `plugin`.
 */

module.exports = plugin;


/**
 * Settings.
 */

var settings = ['directory'];


/**
 * Metalsmith plugin to which uses react as template
 * Adapted from metalsmith-templates
 *
 * @return {Function}
 */

function plugin(opts){
  opts = opts || {};
  

  var dir = opts.directory || 'templates';
  var def = opts.default || 'default.jsx';
  var params = omit(opts, settings);


  return function(files, metalsmith, done){
    var metadata = metalsmith.metadata();

    function check(file){
      var data = files[file];
      var tmpl = data.template || def;

      if (!tmpl) return false;
      return true;
    }

    function renderer(str, options, fn){

      // React 
      var engine = require('react');
      var ReactTools = require('react-tools');

      // Ensure Imports can read jsx extensions
      require.extensions['.jsx'] = function(module, filename) {
        var content;
        content = fs.readFileSync(filename, 'utf8');
        var compiled = ReactTools.transform(content, {harmony: true});
        return module._compile(compiled, filename);
      };


      // Assign HTML 
      var layout = options.layout;
      delete options.layout;


      // Parsing
      var factory = engine.createFactory(require(str));
      var parsed = new factory(options);


      
      try {
       
        var content = engine.renderToStaticMarkup(parsed);


        if (layout){
          var base = fs.readFileSync(layout);
          var compiler = template(base, {interpolate: /{{([\s\S]+?)}}/g});

          content = compiler({content: content});
        }

        fn(null, content);
      } catch (err) {
        fn(err);
      }
    }








    Object.keys(files).forEach(function(file){
      if (!check(file)) return;
      debug('stringifying file: %s', file);
      var data = files[file];
      data.contents = data.contents.toString();
    });





    each(Object.keys(files), convert, done);






    function convert(file, done){
      if (!check(file)) return done();
      debug('converting file: %s', file);

      var data = files[file];
      var clone = extend({}, params, metadata, data);

      var str = metalsmith.path(dir, data.template || def);
      var base = metalsmith.path(dir, 'base.html');

      clone.layout = base;


      var render = renderer;


      render(str, clone, function(err,str){
        if (err) return done(err);
        data.contents = new Buffer(str);
        debug('converted file: %s', file);
        done();
      });

    } // convert

  };  // end function return

}