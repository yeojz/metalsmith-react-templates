const registerExtensionToIgnore = (ext) => {
  if (require.extensions && !require.extensions[ext]) {
    require.extensions[ext] = () => null;
  }
};

export default registerExtensionToIgnore;
