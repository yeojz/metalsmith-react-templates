const addFileToCollection = (files) => (syntheticFile) => {
  syntheticFile.options.debug(`[${syntheticFile.name}] Adding file to collection`);
  files[syntheticFile.name] = syntheticFile.data;
}

export default addFileToCollection;
