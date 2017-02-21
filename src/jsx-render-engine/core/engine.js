import defaults from 'lodash/defaults';
import defaultOptions from './options';
import processor from './processor';

class Engine {
  constructor(files, context, options) {
    defaults(options, defaultOptions);
    this.instance = processor(files, context, options);
  }

  handleError(err) {
    if (err) {
      throw err;
    }
  }

  getInstance() {
    return this.instance;
  }

  render(filename) {
    return this.instance(filename, this.handleError);
  }
}

export default Engine;
