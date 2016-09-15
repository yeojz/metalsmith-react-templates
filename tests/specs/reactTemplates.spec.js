import {expect} from 'chai';
import path from 'path';
import * as reactTemplates from '../../src/reactTemplates';

const file = path.join(__dirname, '..', 'fixtures', 'templates', 'Default.jsx');

describe('reactTemplates', () => {

    it('should get the component', () => {
        const Component = reactTemplates.getComponent(file);
        expect(Component).to.not.be.undefined;
    });

    it('should throw and error when invalid path', () => {
        const fn = () => reactTemplates.getComponent(null);
        expect(fn).to.throw(Error);
    });

    it('should throw an error when no component passed', () => {
        const fn = () => reactTemplates.render(null, {}, {});
        expect(fn).to.throw(Error);
    });

    it('should return a result without react-id', () => {
        const Component = reactTemplates.getComponent(file);
        const result = reactTemplates.render(Component, {});

        expect(result.toString().match(/data-reactid/)).to.eql(null);
        expect(result.toString().match(/data-react-checksum/)).to.eql(null);
    });

    it('should return a result with react-id', () => {
        const Component = reactTemplates.getComponent(file);
        const result = reactTemplates.render(Component, {}, false);
        expect(result.toString().match(/data-reactid/)).to.have.length.gt(0);
        expect(result.toString().match(/data-react-checksum/)).to.have.length.gt(0);
    });
});
