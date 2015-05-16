import debugCore from 'debug';

import fs from 'fs';
import multimatch from 'multimatch';
import objectAssign from 'object-assign';
import path from 'path';

import {each} from 'async';

import React from 'react';
import ReactTools from 'react-tools';
import BabelCore from 'babel-core';


const debug = debugCore('metalsmith-react-templates');



/**
 * Extensions for `require` to accept jsx
 */

// Runs react-tools transform against the file.
function requireReactTools(tooling = {harmony: true}, module, filename) {
  let content = fs.readFileSync(filename, 'utf8');
  let compiled = ReactTools.transform(content, tooling);

  return module._compile(compiled, filename);
}


// Runs babel transform
function requireReactBabel(tooling = {}, module, filename) {
  let compiled = BabelCore.transformFileSync(filename, tooling).code;
  return module._compile(compiled, filename);
}






/**
 *  Simple Micro Templating Function
 */
function tmpl(str, data){

  // Iterates through the keys in file object
  // and interpolate / replace {{key}} with it's value
  for (let k in data){
    if (data.hasOwnProperty(k)){
      let exp = '{{' + k + '}}';
      let regex = new RegExp(exp, 'g');

      str = str.replace(regex, data[k]);
    }
  }

  // Assign the final result back into the contents field
  data.contents = new Buffer(str);

  return data;
}






/**
 * Main rendering function for React
 */
function renderReactTemplate(templatePath, props = {}, options = {}, callback = () => {}) {

  // Ensure .jsx transformation
  if (!require.extensions['.jsx']) {
    const tooling = options.tooling;

    if (options.babel){
      require.extensions['.jsx'] = requireReactBabel.bind(null, tooling);
    } else {
      require.extensions['.jsx'] = requireReactTools.bind(null, tooling);
    }
  }

  // Option for nonStatic rendering
  // Usually used if we want to do a static first load
  // but dynamic interation subsequently.
  // i.e. React Server side rendering style
  const isNonStatic = options.nonStatic;

  // Initialize the template as a factory
  // and apply the options into the factory.
  const tempate = require(templatePath);
  const component = React.createElement(tempate, props);

  try {
    let content;

    if (isNonStatic){
      // renderToString (with React ids)
      content = React.renderToString(component);

    } else {
      // renderToStaticMarkup (React ids removed)
      content = React.renderToStaticMarkup(component);
    }

    callback(null, content);

  } catch (err) {
    callback(err);
  }
}






/**
 *  Plugin Exports
 */
export default (options = {}) => {

  const {
    baseFile = null,
    defaultTemplate = 'default.jsx',
    directory = 'templates',
    html = true,
    pattern = '**/*',
    preserve = false
  } = options;


  return (files, metalsmith, done) => {
    const metadata = metalsmith.metadata();

    each(multimatch(Object.keys(files), pattern), (file, callback) => {
      let data = files[file];

      // Prepare Props
      debug('Preparing Props: %s', file);
      let props = objectAssign({}, data, metadata, {
        contents: data.contents.toString()
      });

      // if opt.preserve is set
      // preserve the raw, not templated content
      if (preserve){
        debug('Preserving untouched contents: %s', file);
        data.rawContents = data.contents;
      }

      // Start Conversion Process
      debug('Starting conversion: %s', file);
      const templatePath = metalsmith.path(directory, data.rtemplate || defaultTemplate);


      renderReactTemplate(templatePath, props, options, (err, result) => {

        if (err){
          return callback(err);
        }


        // Buffer back the result
        data.contents = new Buffer(result);


        // If `baseFile` is specified,
        // insert content into the file.
        if (baseFile){
          debug('Applying baseFile to contents: %s', file);
          const baseFilePath = metalsmith.path(directory, baseFile);
          const baseFileContent = fs.readFileSync(baseFilePath, 'utf8');

          data = tmpl(baseFileContent, data);
        }


        // if `html` is set
        // Rename markdown files to html
        if (html){
          let fileDir = path.dirname(file);
          let fileName = path.basename(file, path.extname(file)) + '.html';

          if (fileDir !== '.'){
            fileName = fileDir + '/' + fileName;
          }

          debug('Renaming file: %s -> %s', file, fileName);

          delete files[file];
          files[fileName] = data;
        }

        // Complete
        debug('Saved file: %s', file);
        callback();
      }); // renderReactTemplate


    }, done); // Each
  }; // Return
}; // export
