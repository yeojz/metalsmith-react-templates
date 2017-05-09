import forEach from 'lodash/forEach';
import get from 'lodash/get';
import omit from 'lodash/omit';

const createPseudoFile = (config) => ({
  ...config,
  contents: new Buffer(get(config, 'contents', ''))
});

const createRoutes = (routes = []) => (files, metalsmith, done) => {
  forEach(routes, (route) => {
    if (route.path) {
      const config = omit(route, [
        'path'
      ]);

      files[route.path] = createPseudoFile(config);
    }
  });

  done();
};

export default createRoutes;
