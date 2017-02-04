import debug from '../debug';
import unset from 'lodash/unset';

const removeFileFromCollection = (files) => (syntheticFile) => {
  debug(`[${syntheticFile.name}] Removing file from collection`);
  unset(files, syntheticFile.name);
  return syntheticFile;
}

export default removeFileFromCollection;
