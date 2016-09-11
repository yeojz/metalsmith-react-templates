import {expect} from 'chai';
import path from 'path';
import renderReactTemplates from '../../src/renderReactTemplates';

const file = path.join(__dirname, '..', 'fixtures', 'templates', 'Default.jsx');

describe('renderReactTemplates', () => {

    it('should return an error', () => {
        const fn = () => renderReactTemplates(null, {}, {});
        expect(fn).to.throw(Error);
    });

    it('should return a result without react-id', () => {
        const result = renderReactTemplates(file, {});

        expect(result.toString().match(/data-reactid/)).to.eql(null);
        expect(result.toString().match(/data-react-checksum/)).to.eql(null);
    });

    it('should return a result with react-id', () => {
        const result = renderReactTemplates(file, {}, false);
        expect(result.toString().match(/data-reactid/)).to.have.length.gt(0);
        expect(result.toString().match(/data-react-checksum/)).to.have.length.gt(0);
    });
});
