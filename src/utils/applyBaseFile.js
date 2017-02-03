import fs from 'fs';
import get from 'lodash/get';
import naiveTemplates from '../templating/naiveTemplates';
import debug from '../debug';

const getDirectory = (syntheticFile) => (
  get(syntheticFile, 'options.baseFileDirectory')
  || get(syntheticFile, 'options.directory')
);

const getBaseFileContent = (baseFile, directory, metalsmith) => {
  const baseFilePath = metalsmith.path(directory, baseFile);
  return fs.readFileSync(baseFilePath, 'utf8');
}

const applyBaseFile = (syntheticFile) => {
  const baseFile = get(syntheticFile, 'data.baseFile') || get(syntheticFile, 'options.baseFile');

  if (!baseFile) {
    return syntheticFile;
  }

  debug(`[${syntheticFile.name}] Applying base file`);
  const directory = getDirectory(syntheticFile);
  const baseFileContent = getBaseFileContent(
    baseFile,
    directory,
    syntheticFile.metalsmith
  );

  const contents = naiveTemplates(
    baseFileContent,
    syntheticFile.data,
    get(syntheticFile, 'options.templateTag')
  );

  syntheticFile.data.contents = new Buffer(contents);
  return syntheticFile;
};

export default applyBaseFile;