import {expect} from 'chai';
import {spy} from 'sinon';
import createRoutes from './createRoutes';

describe('lib/createRoutes', function () {

  it('should return a function', function () {
    expect(createRoutes()).to.be.a.function;
  });

  it('should populate routes to file and call done', function () {
    const done = spy();
    let files = {};
    const routes = [{
      path: 't1',
      contents: 'here 1'
    }, {
      ignore: 'me'
    }, {
      path: 't2',
      contents: 'here 2'
    }];

    createRoutes(routes)(files, spy(), done);

    expect(Object.keys(files)).to.have.length(2);
    expect(files.t1.contents.toString()).to.equal('here 1');
    expect(files.t2.contents.toString()).to.equal('here 2');
    expect(done.calledOnce).to.be.true;
  });

  it('should not throw on undefined or null routes', function () {
    expect(() => createRoutes(null)({}, '', '')).to.not.throw;
    expect(() => createRoutes(void 0)({}, '', '')).to.not.throw;
  });
});
