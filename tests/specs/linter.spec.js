import {expect} from 'chai';
import syncExec from 'sync-exec';

describe('linter', () => {

    it('should pass (src)', (done) => {
        const _command = `eslint --ext .js,.jsx -c .eslintrc --ignore-path .eslintignore --quiet src/*`;
        const result = syncExec(_command);

        expect(result.stdout).to.eql('');
        expect(result.stderr).to.eql('');
        expect(result.status).to.eql(0);

        done();
    });

    it('should pass (tests)', (done) => {
        const _command = `eslint --ext .js,.jsx -c .eslintrc --ignore-path .eslintignore --quiet tests/*`;
        const result = syncExec(_command);

        expect(result.stdout).to.eql('');
        expect(result.stderr).to.eql('');
        expect(result.status).to.eql(0);

        done();
    });
});
