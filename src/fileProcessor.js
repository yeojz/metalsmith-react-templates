import get from 'lodash/get';
import unset from 'lodash/unset';
import constants from './constants';
import debug from './debug';
import applyBaseFile from './utils/applyBaseFile';
import applyFileRenames from './utils/applyFileRenames';
import applyTemplate from './utils/applyTemplate';
import prepareProps from './utils/prepareProps';
import preserveRawContents from './utils/preserveRawContents';
import readTemplateFile from './utils/readTemplateFile';
import registerFile from './utils/registerFile';

const noTemplate = (files, data, name) => {
  registerFile(files)({data, name});
}

const fileProcessor = (files, metalsmith, options) => (filename, callback) => {
  const data = get(files, filename, {});

  Promise
    .resolve({
      metalsmith,
      options,
      data,
      name: filename
    })
    .then((syntheticFile) => {
      unset(files, filename);
      return syntheticFile;
    })
    .then(preserveRawContents)
    .then(prepareProps)
    .then(readTemplateFile)
    .then(applyTemplate)
    .then(applyBaseFile)
    .then(applyFileRenames)
    .then(registerFile(files))
    .then(() => {
      callback();
    })
    .catch((err) => {
      if (err.message === constants.TEMPLATE_NOT_DEFINED) {
        debug(`[${filename}] Template not defined`);
        noTemplate(files, data, filename);
      }
      callback(err)
    });
}

export default fileProcessor;
