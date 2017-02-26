import debug from '../debug';

export default {
  // Processor
  baseFile: null,
  baseFileDirectory: null,
  defaultTemplate: 'Default.jsx',
  directory: 'templates',
  extension: '.html',
  isStatic: true,
  preserve: false,
  props: null,
  strategy: null,
  templateKey: 'rtemplate',
  templateTag: null,

  // Engine
  requireIgnoreExt: [],
  requireTemplateExt: ['.jsx'],
  tooling: {},

  // Extra
  debug
}
