/* eslint-disable no-console */
const execa = require('execa');
const writePackageJson = require('./buildtools/writePackageJson');

const folderName = 'jsx-render-engine';

writePackageJson(folderName);

execa.shell('cp ./docs/JSX_RENDER_ENGINE.md ./jsx-render-engine/README.md')
  .catch((err) => console.error(err));

execa.shell('cp ./.npmignore ./jsx-render-engine/.npmignore')
  .catch((err) => console.error(err));

execa.shell('cp ./LICENSE ./jsx-render-engine/LICENSE')
  .catch((err) => console.error(err));
