import {expect} from 'chai';
import backwardCompat from './backwardCompat';

describe('backwardCompat', function () {

  it('should passthrough when no conditional hits', function () {
    let opt = {
      test: 'ok'
    }
    backwardCompat.options(opt);

    expect(Object.keys(opt)).to.be.length(1);
    expect(opt.test).to.equal('ok');
  });

  it('should set template key when noConflict is set to true', function () {
    let opt = {
      noConflict: true
    };
    backwardCompat.options(opt);

    expect(opt.templateKey).to.equal('rtemplate');
  });

  it('should set template key when noConflict is set to false', function () {
    const opt = {
      noConflict: false
    };
    backwardCompat.options(opt);

    expect(opt.templateKey).to.equal('template');
  });

  it('should duplicate propsKey to props when set', function () {
    const opt = {
      propsKey: 'test1'
    };
    backwardCompat.options(opt);

    expect(opt.props).to.equal('test1');
  });
});
