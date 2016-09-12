import {each} from 'async';
import _debug from 'debug';
import forEach from 'lodash.foreach';
import get from 'lodash.get';
import pick from 'lodash.pick';
import fs from 'fs';
import path from 'path';

import naiveTemplates from './naiveTemplates';
import renderReactTemplates from './renderReactTemplates';
import {requireBabelCore, requireIgnore} from './requireTools';

const debug = _debug('metalsmith-react-templates');

export const patchRequireForJSX = (tooling) => {
    if (!require.extensions['.jsx']) {
        require.extensions['.jsx'] = requireBabelCore(tooling);
    }
}

export const patchRequireToIgnoreFileExtension = (requireIgnoreExt) => {
    forEach(requireIgnoreExt, (ext) => {
        if (!require.extensions[ext]){
            require.extensions[ext] = requireIgnore;
        }
    });
}

export const getProps = (filename, file, options, metalsmith) => {
    debug('[%s] Preparing Props', filename);
    const metadata = metalsmith.metadata();
    const {propsKey} = options;

    if (typeof propsKey === 'function') {
        return propsKey(filename, file, metadata);
    }

    if (typeof propsKey === 'string' || Array.isArray(propsKey)) {
        return pick(file, propsKey);
    }

    return {
        ...file,
        filename,
        metadata,
        contents: file.contents.toString()
    };
}

const assignContentsToFile = (contents, file = {}) => {
    file.contents = new Buffer(contents);
}

export const preserveRawContents = (filename, file, {preserve}) => {
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

export const applyTemplate = (metalsmith, props) => (filename, file, options) => {
    debug('[%s] Starting react conversion', filename);

    const templatePath = getTemplatePath(file, options, metalsmith);
    const contents = renderReactTemplates(templatePath, props,  options.isStatic);

    assignContentsToFile(contents, file)
}

export const interpolateBaseFile = (metalsmith) => (filename, file, options) => {
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

export const finishProcessing = (files) => (filename, file, {extension}) => {
    if (extension) {
        filename = renameFile(files, filename, file, extension);
    }

    debug('[%s] Finished processing', filename);
}
