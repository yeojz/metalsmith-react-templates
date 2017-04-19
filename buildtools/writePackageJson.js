const fs = require('fs');
const path = require('path');
const pick = require('lodash/pick');
const pkg = require('../package.json');

function writePackageJson(folderName) {
  let subpkg = Object.assign({}, pkg, {
    name: 'jsx-render-engine',
    main: 'index.js',
    description: 'Library agnostic in-place JSX rendering engine. Supports react, preact, react-router etc.',
    scripts: {
      test: 'echo "See https://circleci.com/gh/yeojz/metalsmith-react-templates for testing details."'
    },
    keywords: [
      "template",
      "engine",
      "view",
      "jsx",
      "react",
      "reactjs",
      "preact",
      "react-router",
      "server-side-rendering",
      "generator",
      "in-place"
    ],
    dependencies: pick(pkg.dependencies, [
      'debug',
      'lodash'
    ]),
    devDependencies: {},
    peerDependencies: {}
  });

  fs.writeFileSync(
    path.join(__dirname, '..', folderName, 'package.json'),
    JSON.stringify(subpkg, null, 2)
  );
}

module.exports = writePackageJson;
