import {expect} from 'chai';
import Engine from 'src/jsx-render-engine/core/engine';

describe('jsx-render-engine/core/engine', function () {
  it('should throw an error', function () {
    const e = new Engine({}, {}, {});
    expect(() => e.render('test')).to.throw(Error);
  });

  it('should not throw if no err in argument', function () {
    const e = new Engine({}, {}, {});
    expect(() => e.handleError()).to.not.throw(Error);
    expect(() => e.handleError(null)).to.not.throw(Error);
  });
});
