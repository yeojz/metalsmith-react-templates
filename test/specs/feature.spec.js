'use strict';

var equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var templates = require('../../lib');



describe('metalsmith-react-templates', function(){


  it('should do basic template transformation', function(done){

    new Metalsmith('test/fixtures/basic')
      .use(templates({html: false}))
      .build(function(err){
        if (err){ return done(err); }
        equal('test/fixtures/basic/expected', 'test/fixtures/basic/build');
        done();
      });
  });


  it('should render html files rather than markdown', function(done){

    new Metalsmith('test/fixtures/basic-html')
      .use(templates({html: true}))
      .build(function(err){
        if (err){ return done(err); }
        equal('test/fixtures/basic-html/expected', 'test/fixtures/basic-html/build');
        done();
      });
  });


  it('should render contents into baseFile', function(done){

    new Metalsmith('test/fixtures/base-file')
      .use(templates({
        baseFile: 'base.html',
        html: false
      }))
      .build(function(err){
        if (err){ return done(err); }
        equal('test/fixtures/base-file/expected', 'test/fixtures/base-file/build');
        done();
      });
  });


  it('should be able to access yaml front matter as variables in baseFile', function(done){

    new Metalsmith('test/fixtures/base-variables')
      .use(templates({
        baseFile: 'base.html',
        html: true
      }))
      .build(function(err){
        if (err){ return done(err); }
        equal('test/fixtures/base-variables/expected', 'test/fixtures/base-variables/build');
        done();
      });
  });


});
