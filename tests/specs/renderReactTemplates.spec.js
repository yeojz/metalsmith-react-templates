import {expect} from 'chai';
import path from 'path';
import sinon from 'sinon';
import renderReactTemplates from '../../src/renderReactTemplates';

const file = path.join(__dirname, '..', 'fixtures', 'Default.jsx');

describe('renderReactTemplates', () => {
    let spy;

    beforeEach(() => {
        spy = sinon.spy();
    });

    it('should throw error to callback', () => {
        renderReactTemplates(null, {}, {}, spy);

        expect(spy).to.have.been.called;

        const args = spy.args[0];
        expect(args[0].name).to.eql('AssertionError');
    });

    it('should return a result (1)', () => {
        renderReactTemplates(file, {}, {
            isStatic: false
        }, spy);

        expect(spy).to.have.been.called;

        const args = spy.args[0];
        expect(args[0]).to.eql(null);
        expect(args[1]).to.be.a('string');
        expect(args[1].indexOf('data-reactid')).to.not.eql(-1);
    });

    it('should return a result (2)', () => {
        renderReactTemplates(file, {}, {
            isStatic: true
        }, spy);

        expect(spy).to.have.been.called;

        const args = spy.args[0];
        expect(args[0]).to.eql(null);
        expect(args[1]).to.be.a('string');
        expect(args[1].indexOf('data-reactid')).to.eql(-1);
    });
});

