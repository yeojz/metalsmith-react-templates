const defaultMatchHandler = (resolve, reject) => (err, redirectLocation, renderProps) => {
  if (err) {
    reject(err);
    return;
  }

  resolve({redirectLocation, renderProps});
};

function pMatch(match, handler = defaultMatchHandler) {
  return (config) => (
    new Promise((resolve, reject) => {
      match(config, handler(resolve, reject));
    })
  );
}

export default pMatch;
