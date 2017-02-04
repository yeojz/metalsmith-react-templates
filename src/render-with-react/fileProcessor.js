import get from 'lodash/get';

import constants from './constants';
import debug from './debug';
import addFileToCollection from './utils/addFileToCollection';
import applyBaseFile from './utils/applyBaseFile';
import applyFileRenames from './utils/applyFileRenames';
import applyTemplate from './utils/applyTemplate';
import prepareProps from './utils/prepareProps';
import preserveRawContents from './utils/preserveRawContents';
import readTemplateFile from './utils/readTemplateFile';
import removeFileFromCollection from './utils/removeFileFromCollection';

const noTemplate = (files, data, name) => {
  addFileToCollection(files)({data, name});
}

const fileProcessor = (files, context, options) => (filename, callback) => {
  const data = get(files, filename, {});

  Promise
    .resolve({
      context,
      options,
      data,
      name: filename
    })
    .then(removeFileFromCollection(files))
    .then(preserveRawContents)
    .then(prepareProps)
    .then(readTemplateFile)
    .then(applyTemplate)
    .then(applyBaseFile)
    .then(applyFileRenames)
    .then(addFileToCollection(files))
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
