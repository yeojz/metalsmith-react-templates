const processor = {
  baseFile: null,
  baseFileDirectory: null,
  defaultTemplate: 'Default.jsx',
  directory: 'templates',
  extension: '.html',
  isStatic: true,
  preserve: false,
  propsKey: null,
  strategy: null,
  templateKey: 'rtemplate',
  templateTag: null
}

const plugin = {
  ...processor,
  pattern: '**/*',
  requireIgnoreExt: [],
  requireTemplateExt: ['.jsx'],
  tooling: {}
}

export default {
  plugin,
  processor
}
