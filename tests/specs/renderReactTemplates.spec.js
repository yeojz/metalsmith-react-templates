import {expect} from 'chai';
import path from 'path';
import renderReactTemplates from '../../src/renderReactTemplates';

const file = path.join(__dirname, '..', 'fixtures', 'templates', 'Default.jsx');

describe('renderReactTemplates', () => {

    it('should return an error', () => {
        const {err, content} = renderReactTemplates(null, {}, {});
        expect(err.name).to.eql('AssertionError');
    });

    it('should return a result without react-id', () => {
        const {err, result} = renderReactTemplates(file, {});

        expect(err).to.eql(null);
        expect(result.toString().match(/data-reactid/)).to.eql(null);
        expect(result.toString().match(/data-react-checksum/)).to.eql(null);
    });

    it('should return a result with react-id', () => {
        const {err, result} = renderReactTemplates(file, {}, {isStatic: false});

        expect(err).to.eql(null);
        expect(result.toString().match(/data-reactid/)).to.have.length.gt(0);
        expect(result.toString().match(/data-react-checksum/)).to.have.length.gt(0);
    });
});
