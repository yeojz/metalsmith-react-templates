import debug from '../debug';

const registerFile = (files) => (syntheticFile) => {
  debug(`[${syntheticFile.name}] Registering file`);
  files[syntheticFile.name] = syntheticFile.data;
}

export default registerFile;
