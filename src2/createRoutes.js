import forEach from 'lodash/forEach';
import omit from 'lodash/omit';

const createPseudoFile = (config = {}) => ({
  ...config,
  contents: new Buffer('')
})

const createRoutes = (routes = []) => {
  return function routeProcessor(files, metalsmith, done) {
    forEach(routes, (route) => {
      const config = omit(route, ['path']);
      files[route.path] = createPseudoFile(config)
    });

    done();
  }
}

export default createRoutes;
