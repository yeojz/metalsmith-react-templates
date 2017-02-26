import get from 'lodash/get';

function preserveRawContents(syntheticFile) {
  if (get(syntheticFile, 'options.preserve')) {
    syntheticFile.options.debug(`[${syntheticFile.name}] Preserving unprocessed contents`);
    syntheticFile.data.rawContents = syntheticFile.data.contents;
  }

  return syntheticFile;
}

export default preserveRawContents;
