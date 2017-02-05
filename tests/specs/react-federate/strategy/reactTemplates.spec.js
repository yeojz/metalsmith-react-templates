import {expect} from 'chai';
import path from 'path';
import reactTemplates from 'src/react-federate/strategy/reactTemplates';

const file = path.join(__dirname, '..', '..', '..', 'fixtures', 'templates', 'Default.jsx');

describe('reactTemplates', () => {
  it('should throw an error when no component passed', () => {
    const fn = () => reactTemplates(null, {}, {});
    expect(fn).to.throw(Error);
  });

  it('should return a result without react-id', () => {
    const Component = require(file).default;
    const result = reactTemplates(Component, {}, {isStatic: true});

    expect(result.toString().match(/data-reactid/)).to.eql(null);
    expect(result.toString().match(/data-react-checksum/)).to.eql(null);
  });

  it('should return a result with react-id', () => {
    const Component = require(file).default;
    const result = reactTemplates(Component, {}, {isStatic: false});
    expect(result.toString().match(/data-reactid/)).to.have.length.gt(0);
    expect(result.toString().match(/data-react-checksum/)).to.have.length.gt(0);
  });
});
