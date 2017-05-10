import {expect} from 'chai';
import Metalsmith from 'metalsmith';

import helpers from 'tests/helpers';
import AppRoutes from 'tests/fixtures/templates/AppRoutes';
import outputs from 'tests/fixtures/outputs';

import index from './index';
import {v4, getDefaultPropsWithLocation} from './jsx-render-engine/strategy/react-router';

const {fixtures, getContent, trimContent} = helpers;

describe('integration - react router', function () {
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

  it('should be able to render with react router v4 strategy', function (done) {
    const plugin = index({
      props: getDefaultPropsWithLocation,
      routes: AppRoutes,
      strategy: v4
    });

    const test = {
      'default.md': {
        ...files['default.md']
      }
    }

    plugin(test, metalsmith, () => {
      expect(getContent(test['default.html'])).to.eql(trimContent(outputs.default));
      done();
    });
  });
});
