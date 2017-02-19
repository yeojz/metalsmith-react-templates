function defaultProps(propsKey, metadata, syntheticFile) {
  return {
    ...syntheticFile.data,
     metadata,
     filename: syntheticFile.name,
     contents: syntheticFile.data.contents.toString()
  }
}

export default defaultProps;
