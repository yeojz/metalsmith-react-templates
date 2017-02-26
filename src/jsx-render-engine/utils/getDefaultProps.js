function defaultProps(filename, data, metadata) {
  return {
    ...data,
    filename,
    metadata,
    contents: data.contents.toString()
  }
}

export default defaultProps;
