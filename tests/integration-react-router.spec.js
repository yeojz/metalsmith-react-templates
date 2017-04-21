import {expect} from 'chai';
import Metalsmith from 'metalsmith';

import helpers from 'tests/helpers';
import AppRoutes from 'tests/fixtures/templates/AppRoutes';
import outputs from 'tests/fixtures/outputs';

import index from 'src/lib/index';
import reactRouterTemplates, {getDefaultPropsWithLocation} from 'src/jsx-render-engine/strategy/reactRouterTemplates';

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

  it('should be able to render with react router strategy', function (done) {
    const plugin = index({
      props: getDefaultPropsWithLocation,
      routes: AppRoutes,
      strategy: reactRouterTemplates
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
