function options(opt) {
  if (opt.noConflict === true) {
    opt.templateKey = 'rtemplate';
  }

  if (opt.noConflict === false) {
    opt.templateKey = 'template';
  }

  if (opt.propsKey) {
    opt.props = opt.propsKey;
  }

  return opt;
}

export default {
  options
};
