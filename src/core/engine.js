import processor from './processor'

class Engine {
  constructor(files, context, options) {
    this.processor = processor(files, context, options);
  }

  handleError(err) {
    if (err) {
      throw err;
    }
  }

  render(filename) {
    return this.processor(filename, this.handleError);
  }
}

export default Engine;
