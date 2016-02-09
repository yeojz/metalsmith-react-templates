import {assert} from 'chai';
import syncExec from 'sync-exec';

// JS Only
describe('lint - Source', function() {
    let _command = `eslint --ext .js,.jsx -c .eslintrc --ignore-path .eslintignore --quiet src/*`;


    it('it should pass', function(done) {

        const result = syncExec(_command);

        assert.equal(result.stdout, '');
        assert.equal(result.stderr, '');
        assert.equal(result.status, 0);

        done();
    });
});
