import React from 'react';
import ReactDOMServer from 'react-dom/server';
import get from 'lodash/get';

const reactTemplates = (syntheticFile) => {
  const Component = syntheticFile.template;
  const props = get(syntheticFile, 'props', {});
  const isStatic = get(syntheticFile, 'options.isStatic', true);

  if (isStatic){
      return ReactDOMServer.renderToStaticMarkup(<Component {...props} />);
  }

  return ReactDOMServer.renderToString(<Component {...props} />);
}

export default reactTemplates;
