'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');


var Metalsmith = require('metalsmith');
var templates = require('../../lib');






function assertFileContents(expected, built){
  var expectedContents = fs.readFileSync(expected, 'utf-8');
  var buildContents = fs.readFileSync(built, 'utf-8');

  assert.strictEqual(expectedContents, buildContents);
}


function fixturesRel(location){
  return path.join('..', location);
}

function fixtures(location){
  return path.join('test/fixtures', location);
}






describe('metalsmith-react-templates', function(){


  it('should do basic template transformation', function(done){

    new Metalsmith(fixtures('basic'))
      .source(fixturesRel('basic/src'))
      .destination(fixturesRel('results/basic'))
      .use(templates({
        html: false
      }))
      .build(function(err){
        if (err){
          return done(err);
        }

        assertFileContents(
          fixtures('basic/expected/source.md'),
          fixtures('results/basic/source.md')
        );

        done();
      });
  });


  it('should do basic template transformation (using babel)', function(done){

    new Metalsmith('test/fixtures/basic')
      .source(fixturesRel('basic/src'))
      .destination(fixturesRel('results/basic-babel'))
      .use(templates({
        babel: true,
        html: false
      }))
      .build(function(err){
        if (err){
          return done(err);
        }

        assertFileContents(
          fixtures('basic/expected/source.md'),
          fixtures('results/basic-babel/source.md')
        );

        done();
      });
  });


  it('should render html files rather than markdown', function(done){

    new Metalsmith('test/fixtures/basic-html')
      .source(fixturesRel('basic/src'))
      .destination(fixturesRel('results/basic-html'))
      .use(templates({
        html: true
      }))
      .build(function(err){
        if (err){
          return done(err);
        }

        assertFileContents(
          fixtures('basic-html/expected/source.html'),
          fixtures('results/basic-html/source.html')
        );

        done();
      });
  });


  it('should render contents into baseFile', function(done){

    new Metalsmith('test/fixtures/render-with-baseFile')
      .source(fixturesRel('basic/src'))
      .destination(fixturesRel('results/render-with-baseFile'))
      .use(templates({
        baseFile: 'base.html',
        html: false
      }))
      .build(function(err){
        if (err){
          return done(err);
        }

        assertFileContents(
          fixtures('render-with-baseFile/expected/source.md'),
          fixtures('results/render-with-baseFile/source.md')
        );

        done();
      });
  });


  it('should be able to access yaml front matter as variables in baseFile', function(done){

    new Metalsmith('test/fixtures/variables-in-baseFile')
      .destination(fixturesRel('results/variables-in-baseFile'))
      .use(templates({
        baseFile: 'base.html',
        html: true
      }))
      .build(function(err){
        if (err){
          return done(err);
        }

        assertFileContents(
          fixtures('variables-in-baseFile/expected/source.html'),
          fixtures('results/variables-in-baseFile/source.html')
        );

        done();
      });
  });

  it('should be able to access yaml front matter as variables in templates', function(done){

    new Metalsmith('test/fixtures/variables-in-templates')
      .destination(fixturesRel('results/variables-in-templates'))
      .use(templates({
        html: true
      }))
      .build(function(err){
        if (err){
          return done(err);
        }

        assertFileContents(
          fixtures('variables-in-templates/expected/source.html'),
          fixtures('results/variables-in-templates/source.html')
        );

        done();
      });
  });


  it('should render react-ids if isStatic is set to false', function(done){
    new Metalsmith('test/fixtures/basic')
      .destination(fixturesRel('results/basic-react-ids'))
      .use(templates({
        isStatic: false,
        html: true
      }))
      .build(function(err){
        if (err){
          return done(err);
        }

        var content = fs.readFileSync(fixtures('results/basic-react-ids/source.html'), 'utf-8');

        var dataReactId = content.match(/data-reactid/);
        var dataReactChecksum = content.match(/data-react-checksum/);

        assert(dataReactId.length > 0);
        assert(dataReactChecksum.length > 0);

        done();
      });
  });


  it('should use `template` parameter in front-matter instead of `rtemplate`', function(done) {
    new Metalsmith(fixtures('no-conflict'))
      .source(fixturesRel('no-conflict/src'))
      .destination(fixturesRel('results/no-conflict'))
      .use(templates({
        html: false,
        noConflict: false
      }))
      .build(function(err){
        if (err){
          return done(err);
        }

        assertFileContents(
          fixtures('no-conflict/expected/source.md'),
          fixtures('results/no-conflict/source.md')
        );

        done();
      });
  });

});












