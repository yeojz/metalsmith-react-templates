import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import pick from 'lodash/pick';

import debug from '../debug';

const getProps = (propsKey, metadata, syntheticFile) => {
  if (isFunction(propsKey)) {
    return propsKey(
      syntheticFile.name,
      syntheticFile.data,
      metadata
    );
  }

  if (isString(propsKey) || isArray(propsKey)) {
    return pick(syntheticFile.data, propsKey);
  }

  return {
    ...syntheticFile.data,
    metadata,
    filename: syntheticFile.name,
    contents: syntheticFile.data.contents.toString()
  };
}

const prepareProps = (syntheticFile) => {
  debug(`[${syntheticFile.name}] Preparing props`);

  const metadata = syntheticFile.metalsmith.metadata();
  const propsKey = get(syntheticFile, 'options.propsKey');

  syntheticFile.props = getProps(propsKey, metadata, syntheticFile);
  return syntheticFile;
};

export default prepareProps;
