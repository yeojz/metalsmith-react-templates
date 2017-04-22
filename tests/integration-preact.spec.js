import {expect} from 'chai';
import Metalsmith from 'metalsmith';

import helpers from 'tests/helpers';
import outputs from 'tests/fixtures/outputs';

import index from 'src/index';
import preactTemplates from 'src/jsx-render-engine/strategy/preactTemplates';

const {fixtures, getContent, trimContent} = helpers;

describe('integration - preact', function () {
  let files;
  let metalsmith;

  before(function (done) {
    metalsmith = new Metalsmith(fixtures);

    metalsmith.read((err, result) => {
      if (err) throw err;
      files = result;
      done();
    });
  });

  it('should be able to render with preact strategy', function (done) {
    const plugin = index({
      strategy: preactTemplates
    });

    const test = {
      'preact.md': {
        ...files['preact.md']
      }
    }

    plugin(test, metalsmith, () => {
      expect(getContent(test['preact.html'])).to.eql(trimContent(outputs.default));
      done();
    });
  });

});
