import {each} from 'async';
import _debug from 'debug';
import fs from 'fs';
import multimatch from 'multimatch';
import path from 'path';

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
        baseFileDirectory = null,
        defaultTemplate = 'Default.jsx',
        directory = 'templates',
        html = true,
        isStatic = true,
        noConflict = true,
        pattern = '**/*',
        preserve = false,
        preserveProps = false,
        requireIgnoreExt = [],
        templateTag = null,
        tooling = {}
    } = options;

    let {
        extension = null,
    } = options;

    // Backward compatibility
    if (html && extension === null) {
        extension = '.html';
    }

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

    // Returns plugin function (non-arrow)
    return function(files, metalsmith, done) {
        const metadata = metalsmith.metadata();

        each(multimatch(Object.keys(files), pattern), (file, callback) => {
            let data = files[file];

            // Prepare Props
            debug('Preparing Props: %s', file);
            let props = {
                ...data,
                filename: file,
                metadata,
                contents: data.contents.toString()
            }

            // if opt.preserve is set
            // preserve the raw, not templated content
            if (preserve){
                debug('Preserving untouched contents: %s', file);
                data.rawContents = data.contents;
            }

            // if opt.preserveProps is set
            // preserve the props provided to the template
            if (preserveProps) {
                debug('Preserving props: %s', file);
                data.props = props;
            }

            // Start Conversion Process
            debug('Preparing template: %s', file);
            const templateKey = (noConflict) ? 'rtemplate' : 'template';
            const templateDefined = data[templateKey];

            // If useDefault is false, and no template defined
            // then ignore this file.
            if (!templateDefined && !defaultTemplate) {
                callback();
                return;
            }

            // Generate the template path
            const templatePath = metalsmith.path(directory, templateDefined || defaultTemplate);

            // Start templating
            debug('Starting conversion: %s', file);
            const {err, result} = renderReactTemplates(templatePath, props, {
                isStatic
            });

            if (err){
                callback(err);
                return;
            }

            // Buffer back the result
            data.contents = new Buffer(result);

            // Allow for per source baseFile overrides
            const baseFileDefined = data.baseFile || baseFile;

            // If `baseFile` is specified,
            // insert content into the file.
            if (baseFileDefined){
                debug('Applying baseFile to contents: %s', file);
                const baseFilePath = metalsmith.path(baseFileDirectory || directory, baseFileDefined);

                try {
                    const baseFileContent = fs.readFileSync(baseFilePath, 'utf8');
                    data = naiveTemplates(baseFileContent, data, templateTag);

                } catch (err) {
                    callback(err);
                    return;
                }
            }

            // Rename markdown files to desired extension
            if (extension){
                let fileDir = path.dirname(file);
                let fileName = path.basename(file, path.extname(file)) + extension;

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

        }, done); // Each
    }; // Return function
};
