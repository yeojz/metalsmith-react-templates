function options(opt) {
    if (opt.noConflict === true) {
      opt.templateKey = 'rtemplate';
    }

    if (opt.noConflict === false) {
      opt.templateKey = 'template';
    }
}

export default {
  options
};
