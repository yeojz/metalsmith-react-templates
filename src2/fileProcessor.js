import get from 'lodash/get';
import unset from 'lodash/unset';
import preserveRawContents from './utils/preserveRawContents';
import prepareProps from './utils/prepareProps';

const fileProcessor = (files, metalsmith, options) => (filename, callback) => {
  Promise.resolve({
    metalsmith,
    options,
    data: get(files, filename, {}),
    name: filename
  })
  .then((syntheticFile) => {
    unset(files, filename);
    return syntheticFile;
  })
  .then(preserveRawContents)
  .then(prepareProps)
  // .then(readTemplateFile)
  // .then(applyTemplate)
  // .then(applyBaseFile)
  // .then(applyFileRenames)
  .then((syntheticFile) => {
    files[syntheticFile.name] = syntheticFile.data;
  })
  .then(() => callback())
  .catch((err) => callback(err));
}

export default fileProcessor;
