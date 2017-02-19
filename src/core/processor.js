import get from 'lodash/get';

import constants from '../constants';
import debug from '../debug';
import addFileToCollection from '../utils/addFileToCollection';
import applyBaseFile from '../utils/applyBaseFile';
import applyFileRenames from '../utils/applyFileRenames';
import applyTemplate from '../utils/applyTemplate';
import prepareProps from '../utils/prepareProps';
import preserveRawContents from '../utils/preserveRawContents';
import removeFileFromCollection from '../utils/removeFileFromCollection';
import defaultOptions from './options';

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

export default (files, context, fileOptions) => {
  const options = Object.assign({}, defaultOptions.processor, fileOptions);

  return function processor(filename, done) {
    const data = get(files, filename, {});

    if (!data) {
      callbackOrThrow(`Cannot find ${filename} in the file object`, done);
      return;
    }

    Promise.resolve({
        context,
        options,
        data,
        name: filename
      })
      .then(removeFileFromCollection(files))
      .then(preserveRawContents)
      .then(prepareProps)
      .then(applyTemplate)
      .then(applyBaseFile)
      .then(applyFileRenames)
      .then(addFileToCollection(files))
      .then(() => done())
      .catch((err) => {
        if (err.message === constants.TEMPLATE_NOT_DEFINED) {
          debug(`[${filename}] Template not defined`);
          noTemplate(files, data, filename);
        }

        callbackOrThrow(err, done);
      });
  }
}
