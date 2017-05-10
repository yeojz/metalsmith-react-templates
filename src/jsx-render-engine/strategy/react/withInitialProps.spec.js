import {expect} from 'chai';
import withInitialProps from './withInitialProps';

describe('jsx-render-engine/strategy/react/withInitialProps', function () {
  it('should return a class', function () {
    expect(withInitialProps(null)).to.be.a.class;
  });
});
