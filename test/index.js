var assert = require('assert');
var equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var templates = require('../lib');



describe('metalsmith-react-templates', function(){


  it('should render a basic template', function(done){
    var metalsmith = Metalsmith('test/fixtures/basic');

    metalsmith
      .use(templates())
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/basic/expected', 'test/fixtures/basic/build');
        done();
      });
  });



  it('should render a content into base template', function(done){
    var metalsmith = Metalsmith('test/fixtures/base-file');

    metalsmith
      .use(templates({
        baseFile: 'base.html'
      }))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/base-file/expected', 'test/fixtures/base-file/build');
        done();
      });
  });  


  
});
