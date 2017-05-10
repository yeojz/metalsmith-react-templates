import {expect} from 'chai';
import * as all from './index';

describe('jsx-render-engine/strategy/react-router/index', function () {

  it('check export count', function () {
    expect(Object.keys(all).length).to.equal(4);
  });

  it('exports v3', function () {
    expect(all.v4).to.be.a.function;
  });

  it('exports v4', function () {
    expect(all.v4).to.be.a.function;
  });

  it('exports getDefaultPropsWithLocation', function () {
    expect(all.getDefaultPropsWithLocation).to.be.function;
  })
});
