const processor = {
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
