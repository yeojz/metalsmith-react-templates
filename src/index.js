import _debug from 'debug';

import fs from 'fs';
import multimatch from 'multimatch';
import path from 'path';

import {each} from 'async';

import naiveTemplates from './naiveTemplates';
import renderReactTemplates from './renderReactTemplates';
import requireTools from './requireTools';

const debug = _debug('metalsmith-react-templates');

/**
 *  index.js
 *
 *  Main Plugin Function
 */
export default (options = {}) => {

    const {
        baseFile = null,
        defaultTemplate = 'default.jsx',
        directory = 'templates',
        html = true,
        pattern = '**/*',
        preserve = false,
        requireIgnoreExt = [],
        noConflict = true,
        tooling = {}
    } = options;


    // Ensure .jsx transformation
    if (!require.extensions['.jsx']) {
        require.extensions['.jsx'] = requireTools.babelCore.bind(null, tooling);
    }


    // Adding File ignore in requires.
    // In the event build systms like webpack is used.
    if (Array.isArray(requireIgnoreExt)){
        requireIgnoreExt.forEach((ext) => {
            if (!require.extensions[ext]){
                require.extensions[ext] = requireTools.ignore;
            }
        });
    }



    return (files, metalsmith, done) => {
        const metadata = metalsmith.metadata();

        each(multimatch(Object.keys(files), pattern), (file, callback) => {
            let data = files[file];

            // Prepare Props
            debug('Preparing Props: %s', file);
            let props = {
                ...data,
                metadata,
                contents: data.contents.toString()
            }

            // if opt.preserve is set
            // preserve the raw, not templated content
            if (preserve){
                debug('Preserving untouched contents: %s', file);
                data.rawContents = data.contents;
            }

            // Start Conversion Process
            debug('Starting conversion: %s', file);
            const templateKey = (noConflict) ? 'rtemplate' : 'template';
            const templatePath = metalsmith.path(directory, data[templateKey] || defaultTemplate);


            renderReactTemplates(templatePath, props, options, (err, result) => {

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

                    data = naiveTemplates(baseFileContent, data);
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
