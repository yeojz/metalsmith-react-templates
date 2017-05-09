import {expect} from 'chai';
import {spy} from 'sinon';
import processor from 'src/jsx-render-engine/core/processor';

describe('jsx-render-engine/core/processor', function () {
  it('should throw an error', function () {
    expect(() => processor({}, {}, {})('test')).to.throw(Error);
  });

  it('should call done with argument', function () {
    const done = spy();
    expect(() => processor({}, {}, {})('test', done)).to.not.throw(Error);
    expect(done.calledOnce).to.be.true;
    expect(done.getCall(0).args).to.have.length(1);
  });
});
