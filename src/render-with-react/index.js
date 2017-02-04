import defaults from 'lodash/defaults';
import fileProcessor from './fileProcessor';

export const renderOptions = {
  baseFile: null,
  baseFileDirectory: null,
  defaultTemplate: 'Default.jsx',
  directory: 'templates',
  extension: '.html',
  isStatic: true,
  noConflict: true,
  preserve: false,
  propsKey: null,
  renderer: 'react',
  templateTag: null
}

export default (files, context, options) => {
  defaults(options, renderOptions);
  return fileProcessor(files, context, options)
};
