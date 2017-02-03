import get from 'lodash/get';
import debug from '../debug';

const preserveRawContents = (syntheticFile) => {
  if (get(syntheticFile, 'options.preserve')) {
    debug(`[${syntheticFile.name}] Preserving unprocessed contents`);
    syntheticFile.data.rawContents = syntheticFile.data.contents;
  }

  return syntheticFile;
};

export default preserveRawContents;
