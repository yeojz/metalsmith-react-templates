import debug from '../debug';

const addFileToCollection = (files) => (syntheticFile) => {
  debug(`[${syntheticFile.name}] Adding file to collection`);
  files[syntheticFile.name] = syntheticFile.data;
}

export default addFileToCollection;
