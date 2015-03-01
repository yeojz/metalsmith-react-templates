'use strict';

var execSync = require('exec-sync');
var assert = require('assert');
var fs = require('fs');


// JS Only
describe('lint - JS files', function(){

  var js = 'jsxhint -c .jshintrc' + 
        ' lib/*.js' +
        ' test/**/*.js';

  var jsResult = './test/logs/jshint.json';

  it('it should pass', function(done){

    var result = execSync(js);

    execSync('mkdir -p ./test/logs; rm -f '+ jsResult);

    if (result){
      fs.writeFile(jsResult, result, function(){}); 
    }

    assert.equal(result, '');
    done();
  });
});


// JSX Only
describe('lint - JSX files', function(){

  var jsx = 'jsxhint -c .jsxhintrc' + 
        ' lib/*.jsx' +
        ' test/**/*.jsx';

  var jsxResult = './test/logs/jsxhint.json';

  it('it should pass', function(done){

    var result = execSync(jsx);

    execSync('mkdir -p ./test/logs; rm -f ' + jsxResult);

    if (result){
      fs.writeFile(jsxResult, result, function(){}); 
    }

    assert.equal(result, '');
    done();
  });
});



