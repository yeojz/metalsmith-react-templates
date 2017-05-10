import {expect} from 'chai';
import * as all from './index';

describe('jsx-render-engine/strategy/react/index', function () {

  it('check export count', function () {
    expect(Object.keys(all).length).to.equal(3);
  });

  it('exports withInitialProps', function () {
    expect(all.withInitialProps).to.be.function;
  })
});
