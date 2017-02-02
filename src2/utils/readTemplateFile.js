import get from 'lodash/get';

const getTemplateKey = (syntheticFile) => {
  syntheticFile.options.noConflict
    ? 'rtemplate'
    : 'template';
}

const getTemplate = (syntheticFile, templateKey) => (
  get(syntheticFile, ['data', templateKey])
  || get(syntheticFile, 'options.defaultTemplate');
)

const getTemplatepath = (syntheticFile, template) => {
  const directory = get(syntheticFile, 'options.directory');
  return syntheticFile.metalsmith.path(directory, template);
}

const readTemplateFile = (syntheticFile) => {
  const templateKey = getTemplateKey(syntheticFile);
  const template = getTemplate(syntheticFile, templateKey);

  if (!template) {
    throw new Error('No template found');
  }

  const templatePath = getTemplate(syntheticFile, template);

  syntheticFile.template = require(templatePath).default;
  return syntheticFile;
}

export default readTemplateFile;
