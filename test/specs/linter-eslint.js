'use strict';

var syncExec = require('sync-exec');
var assert = require('assert');
var fs = require('fs');


// JS Only
describe('lint - Source', function(){

  var jsResult = './test/logs/lint-source-js.txt';

  var js = 'eslint' +
        ' --ext .js,.jsx' +
        ' -c .eslintrc' +
        ' --ignore-path .eslintignore' +
        ' --quiet' +
        ' src/*';

  it('it should pass', function(done){

    syncExec('mkdir -p ./test/logs; rm -f ' + jsResult);

    var result = syncExec(js);

    if (result){
      fs.writeFile(jsResult, result, function(){});
    }

    assert.equal(result.stdout, '');
    assert.equal(result.stderr, '');
    assert.equal(result.status, 0);

    done();
  });
});
