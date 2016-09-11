import {each} from 'async';
import _debug from 'debug';
import defaults from 'lodash.defaults';
import forEach from 'lodash.foreach';
import get from 'lodash.get';
import fs from 'fs';
import multimatch from 'multimatch';
import path from 'path';

import naiveTemplates from './naiveTemplates';
import renderReactTemplates from './renderReactTemplates';
import {requireBabelCore, requireIgnore} from './requireTools';

const debug = _debug('metalsmith-react-templates');

const defaultOptions = {
    baseFile: null,
    baseFileDirectory: null,
    defaultTemplate: 'Default.jsx',
    directory: 'templates',
    extension: '.html',
    isStatic: true,
    noConflict: true,
    pattern: '**/*',
    preserve: false,
    requireIgnoreExt: [],
    templateTag: null,
    tooling: {},
    propsKey: null
}

const patchRequireForJSX = (tooling) => {
    if (!require.extensions['.jsx']) {
        require.extensions['.jsx'] = requireBabelCore(tooling);
    }
}

const patchRequireToIgnoreFileExtension = (requireIgnoreExt) => {
    forEach(requireIgnoreExt, (ext) => {
        if (!require.extensions[ext]){
            require.extensions[ext] = requireIgnore;
        }
    });
}

const getProps = (filename, file, options, metalsmith) => {
    debug('[%s] Preparing Props', filename);

    if (options.propsKey) {
        return get(file, options.propsKey, {});
    }

    return {
        ...file,
        filename,
        metadata: metalsmith.metadata(),
        contents: file.contents.toString()
    };
}

const assignContentsToFile = (contents, file = {}) => {
    file.contents = new Buffer(contents);
}

const preserveRawContents = (filename, file, {preserve}) => {
    if (preserve){
        debug('[%s] Preserve untouched contents: %s', filename);
        file.rawContents = file.contents;
    }
}

const getTemplatePath = (file, options, metalsmith) => {
    const templateKey = (options.noConflict) ? 'rtemplate' : 'template';
    const template = get(file, templateKey) || options.defaultTemplate;

    if (!template) {
        throw 'No template found';
    }

    return metalsmith.path(options.directory, template);
}

const applyTemplate = (metalsmith, props) => (filename, file, options) => {
    debug('[%s] Starting react conversion', filename);

    const templatePath = getTemplatePath(file, options, metalsmith);
    const contents = renderReactTemplates(templatePath, props,  options.isStatic);

    assignContentsToFile(contents, file)
}

const interpolateBaseFile = (metalsmith) => (filename, file, options) => {
    const baseFile = get(file, 'baseFile', options.baseFile);

    if (!baseFile) {
        return;
    }

    debug('[%s] Applying contents to a baseFile', filename);

    const directory = options.baseFileDirectory || options.directory;
    const baseFilePath = metalsmith.path(directory, baseFile);
    const baseFileContent = fs.readFileSync(baseFilePath, 'utf8');
    const contents = naiveTemplates(baseFileContent, file, options.templateTag);

    assignContentsToFile(contents, file);
}

const getFilename = (directory, basename, extension) => {
    if (directory === '.') {
        return `${basename}${extension}`;
    }
    return `${directory}${basename}${extension}`;
}

const renameFileExtension = (filename, extension) => {
    const directory =  path.dirname(filename);
    const basename = path.basename(filename, path.extname(filename));

    return getFilename(directory, basename, extension);
}

const renameFile = (files, filename, file, extension) => {
    const newFilename = renameFileExtension(filename, extension);

    files[newFilename] = file;
    delete files[filename];

    debug('[%s -> %s] Renamed file', filename, newFilename);
    return newFilename;
}

const finishProcessing = (files) => (filename, file, {extension}) => {
    if (extension) {
        filename = renameFile(files, filename, file, extension);
    }

    debug('[%s] Finished processing', filename);
}

const fileProcessor = (files, metalsmith, options) => (filename, callback) => {
    const file = get(files, filename);
    const props = getProps(filename, file, options, metalsmith);

    const processingChain = [
        preserveRawContents,
        applyTemplate(metalsmith, props),
        interpolateBaseFile(metalsmith),
        finishProcessing(files)
    ];

    try {
        forEach(processingChain, (fn) => fn(filename, file, options));
    } catch (err) {
        if (err !== 'No template found') {
            callback(err);
            return;
        }
    }
    callback();
}

export default (options = {}) => {
    defaults(options, defaultOptions);
    patchRequireForJSX(options.tooling);
    patchRequireToIgnoreFileExtension(options.requireIgnoreExt);

    return function reactTemplates(files, metalsmith, done) {
        const matchedFiles = multimatch(Object.keys(files), options.pattern);
        const processor = fileProcessor(files, metalsmith, options);

        each(matchedFiles, processor, done);
    }
}
