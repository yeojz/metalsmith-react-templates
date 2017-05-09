/* eslint-disable no-console */
require('babel-core/register');
var Metalsmith = require('metalsmith');
var reactTemplate = require('metalsmith-react-templates').default;

new Metalsmith(__dirname)
  .source('./src')
  .clean(true)
  .use(reactTemplate({
    babel: true,
    directory: 'templates',
    baseFile: 'base.html',
    isStatic: false
  }))
  .destination('./build')
  .build(function(err) {
    if (err) {
      throw err;
    }
  });
