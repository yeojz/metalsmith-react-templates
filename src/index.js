import {each} from 'async';
import defaults from 'lodash.defaults';
import forEach from 'lodash.foreach';
import get from 'lodash.get';
import multimatch from 'multimatch';

import * as fn from './fn';

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
    propsKey: null,
    requireIgnoreExt: [],
    templateTag: null,
    tooling: {}
}

const fileProcessor = (files, metalsmith, options) => (filename, callback) => {
    const file = get(files, filename);
    const props = fn.getProps(filename, file, options, metalsmith);

    const processingChain = [
        fn.preserveRawContents,
        fn.applyTemplate(metalsmith, props),
        fn.interpolateBaseFile(metalsmith),
        fn.finishProcessing(files)
    ];

    try {
        forEach(processingChain, (method) => method(filename, file, options));
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
    fn.patchRequireForJSX(options.tooling);
    fn.patchRequireToIgnoreFileExtension(options.requireIgnoreExt);

    return function reactTemplates(files, metalsmith, done) {
        const matchedFiles = multimatch(Object.keys(files), options.pattern);
        const processor = fileProcessor(files, metalsmith, options);

        each(matchedFiles, processor, done);
    }
}
