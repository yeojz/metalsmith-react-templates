import {expect} from 'chai';
import * as all from './index';

describe('jsx-render-engine/index', function () {

  it('check export count', function () {
    expect(Object.keys(all).length).to.equal(2);
  });

  it('exports registerExtensions', function () {
    expect(all.registerExtensions).to.be.function;
  })
});
