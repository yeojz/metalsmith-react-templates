import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import pick from 'lodash/pick';

import getDefaultProps from './getDefaultProps';

const getProps = (syntheticFile, propsKey, metadata) => {
  if (isString(propsKey) || isArray(propsKey)) {
    return pick(syntheticFile.data, propsKey);
  }

  const fn = isFunction(propsKey) ? propsKey : getDefaultProps;

  return fn(
    syntheticFile.name,
    syntheticFile.data,
    metadata
  );
}

const getMetadata = (syntheticFile) => {
  if (isFunction(get(syntheticFile, 'context.metadata'))) {
    return syntheticFile.context.metadata();
  }
  return void 0;
}

function prepareProps(syntheticFile) {
  syntheticFile.options.debug(`[${syntheticFile.name}] Preparing props`);

  const metadata = getMetadata(syntheticFile);
  const propsKey = get(syntheticFile, 'options.propsKey');

  syntheticFile.props = getProps(syntheticFile, propsKey, metadata);
  return syntheticFile;
}

export default prepareProps;
