import {expect} from 'chai';
import syncExec from 'sync-exec';

describe('linter', () => {
    let _command = `eslint --ext .js,.jsx -c .eslintrc --ignore-path .eslintignore --quiet src/*`;

    it('should pass', (done) => {
        const result = syncExec(_command);

        expect(result.stdout).to.eql('');
        expect(result.stderr).to.eql('');
        expect(result.status).to.eql(0);

        done();
    });
});
