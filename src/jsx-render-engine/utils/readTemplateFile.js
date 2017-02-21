import get from 'lodash/get';
import constants from '../constants';
import debug from '../debug';

const getTemplateKey = (syntheticFile) => (
  syntheticFile.options.templateKey
);

const getTemplate = (syntheticFile, templateKey) => (
  get(syntheticFile, ['data', templateKey])
  || get(syntheticFile, 'options.defaultTemplate')
);

const getTemplatePath = (syntheticFile, template) => {
  const directory = get(syntheticFile, 'options.directory', '');
  return syntheticFile.context.path(directory, template);
};

const readTemplateFile = (syntheticFile) => () => {
  debug(`[${syntheticFile.name}] Reading template file`);
  const templateKey = getTemplateKey(syntheticFile);
  const template = getTemplate(syntheticFile, templateKey);

  if (!template) {
    throw new Error(constants.TEMPLATE_NOT_DEFINED);
  }

  const templatePath = getTemplatePath(syntheticFile, template);
  return require(templatePath).default;
};

export default readTemplateFile;
