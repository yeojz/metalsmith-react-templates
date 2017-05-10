import fs from 'fs';
import get from 'lodash/get';
import naiveTemplates from '../strategy/naive';

const getDirectory = (syntheticFile) => (
  get(syntheticFile, 'options.baseFileDirectory')
  || get(syntheticFile, 'options.directory')
);

const getBaseFileContent = (baseFile, directory, context) => {
  const baseFilePath = context.path(directory, baseFile);
  return fs.readFileSync(baseFilePath, 'utf8');
}

function applyBaseFile(syntheticFile) {
  const baseFile = get(syntheticFile, 'data.baseFile') || get(syntheticFile, 'options.baseFile');

  if (!baseFile) {
    return syntheticFile;
  }

  syntheticFile.options.debug(`[${syntheticFile.name}] Applying base file`);
  const directory = getDirectory(syntheticFile);
  const baseFileContent = getBaseFileContent(
    baseFile,
    directory,
    syntheticFile.context
  );

  const renderer = naiveTemplates(
    baseFileContent,
    syntheticFile.data,
    get(syntheticFile, 'options.templateTag')
  );

  return renderer.then((contents) => {
    syntheticFile.data.contents = new Buffer(contents);
    return syntheticFile;
  })
}

export default applyBaseFile;
