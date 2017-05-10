import get from 'lodash/get';
import path from 'path';
import getDefaultProps from '../../utils/getDefaultProps';

function getLocation(filename) {
  return '/' + path.basename(filename, path.extname(filename));
}

function getDefaultPropsWithLocation(filename, data, metadata) {
  return {
    defaultProps: getDefaultProps(filename, data, metadata),
    location: get(data, 'location', getLocation(filename))
  };
}

export default getDefaultPropsWithLocation;
