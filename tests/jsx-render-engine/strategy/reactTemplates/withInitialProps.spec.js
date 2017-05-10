import {expect} from 'chai';
import withInitialProps from 'src/jsx-render-engine/strategy/react/withInitialProps';

describe('jsx-render-engine/core/withInitialProps', function () {
  it('should return a class', function () {
    expect(withInitialProps(null)).to.be.a.class;
  });
});
