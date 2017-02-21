import unset from 'lodash/unset';

function removeFileFromCollection(files) {
  return (syntheticFile) => {
    syntheticFile.options.debug(`[${syntheticFile.name}] Removing file from collection`);
    unset(files, syntheticFile.name);
    return syntheticFile;
  };
}

export default removeFileFromCollection;
