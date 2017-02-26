import get from 'lodash/get';
import path from 'path';

const getFilePath = (directory, basename, extension) => {
    if (directory === '.') {
        return `${basename}${extension}`;
    }
    return path.join(directory, `${basename}${extension}`);
};

const replaceFileExtension = (filename, extension) => {
  const directory =  path.dirname(filename);
  const basename = path.basename(filename, path.extname(filename));

  return getFilePath(directory, basename, extension);
};

function applyFileRenames(syntheticFile) {
  const extension = get(syntheticFile, 'options.extension');
  if (!extension) {
    return syntheticFile;
  }

  const newName = replaceFileExtension(syntheticFile.name, extension);

  syntheticFile.options.debug(`[${syntheticFile.name}] Renaming file to [${newName}]`);
  syntheticFile.name = newName;

  return syntheticFile;
}

export default applyFileRenames;
