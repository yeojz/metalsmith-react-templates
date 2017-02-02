import get from 'lodash/get';
import debug from './debug';

const preserveRawContents = (syntheticFile) => {
  if (get(syntheticFile, 'options.preserve')) {
    debug('[%s] Preserving unprocessed contents', syntheticFile.name);
    syntheticFile.data.rawContents = syntheticFile.data.contents;
  }

  return syntheticFile;
}

export default preserveRawContents;
