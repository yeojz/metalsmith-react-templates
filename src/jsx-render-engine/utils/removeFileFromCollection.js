import unset from 'lodash/unset';

const removeFileFromCollection = (files) => (syntheticFile) => {
  syntheticFile.options.debug(`[${syntheticFile.name}] Removing file from collection`);
  unset(files, syntheticFile.name);
  return syntheticFile;
}

export default removeFileFromCollection;
