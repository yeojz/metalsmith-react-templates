import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import pick from 'lodash/pick';

import getDefaultProps from './getDefaultProps';

const getProps = (syntheticFile, props, metadata) => {
  if (isString(props) || isArray(props)) {
    return pick(syntheticFile.data, props);
  }

  const fn = isFunction(props) ? props : getDefaultProps;

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
  const props = get(syntheticFile, 'options.props');

  syntheticFile.props = getProps(syntheticFile, props, metadata);
  return syntheticFile;
}

export default prepareProps;
