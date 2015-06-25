'use strict';

var syncExec = require('sync-exec');
var assert = require('assert');


// JS Only
describe('lint - Source', function(){

  var js = 'eslint' +
        ' --ext .js,.jsx' +
        ' -c .eslintrc' +
        ' --ignore-path .eslintignore' +
        ' --quiet' +
        ' src/*';

  it('it should pass', function(done){

    var result = syncExec(js);

    assert.equal(result.stdout, '');
    assert.equal(result.stderr, '');
    assert.equal(result.status, 0);

    done();
  });
});
