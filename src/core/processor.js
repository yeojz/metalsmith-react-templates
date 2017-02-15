import get from 'lodash/get';

import constants from '../constants';
import debug from '../debug';
import addFileToCollection from '../utils/addFileToCollection';
import applyBaseFile from '../utils/applyBaseFile';
import applyFileRenames from '../utils/applyFileRenames';
import applyTemplate from '../utils/applyTemplate';
import prepareProps from '../utils/prepareProps';
import preserveRawContents from '../utils/preserveRawContents';
import readTemplateFile from '../utils/readTemplateFile';
import removeFileFromCollection from '../utils/removeFileFromCollection';
import renderOptions from './options';

const noTemplate = (files, data, name) => {
  addFileToCollection(files)({data, name});
}

const callbackOrThrow = (err, done) => {
  if (done) {
    done(err);
    return;
  }
  throw new Error(err);
}

const processor = (files, context, options) => (filename, done) => {
  const data = get(files, filename, {});

  if (!data) {
    callbackOrThrow(`Cannot find ${filename} in the file object`, done);
    return;
  }

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
      done();
    })
    .catch((err) => {
      if (err.message === constants.TEMPLATE_NOT_DEFINED) {
        debug(`[${filename}] Template not defined`);
        noTemplate(files, data, filename);
      }

      callbackOrThrow(err, done);
    });
}

export default (files, context, options) => {
  const fileOptions = Object.assign({}, renderOptions, options);
  return processor(files, context, fileOptions);
};
