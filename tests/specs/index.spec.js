import {expect} from 'chai';
import fs from 'fs';
import Metalsmith from 'metalsmith';
import path from 'path';

import {fixtures, getContent, trimContent} from '../helpers';
import outputs from '../fixtures/outputs';
import index from '../../src/index';

describe('index', () => {
    let files;
    let metalsmith;

    before((done) => {
        metalsmith = new Metalsmith(fixtures);
        metalsmith.read((err, result) => {
            files = result;
            done();
        });
    });

    it('should work with default options', (done) => {
        const plugin = index();

        const test = {
            'default.md': {...files['default.md']}
        }

        plugin(test, metalsmith, () => {
            expect(getContent(test['default.html'])).to.eql(trimContent(outputs.default));
            done();
        });
    });

    it('should keep original file extension', (done) => {
        const plugin = index({html: false});

        const test = {
            'default.md': {...files['default.md']}
        }

        plugin(test, metalsmith, () => {
            expect(test['default.md']).to.exist;
            done();
        });
    });

    it('should rename file extension', (done) => {
        const plugin = index({extension: '.htm'});

        const test = {
            'default.md': {...files['default.md']}
        }

        plugin(test, metalsmith, () => {
            expect(test['default.htm']).to.exist;
            done();
        });
    });

    it('should use a base file', (done) => {
        const plugin = index({baseFile: 'base.html'});

        const test = {
            'default.md': {...files['default.md']}
        }

        plugin(test, metalsmith, () => {
            expect(getContent(test['default.html'])).to.eql(trimContent(outputs.baseFileDefault));
            done();
        });
    });

    it('should use a different base file directory', (done) => {
        const plugin = index({
            baseFile: 'base-alt.html',
            baseFileDirectory: 'others'
        });

        const test = {
            'default.md': {...files['default.md']}
        }

        plugin(test, metalsmith, () => {
            expect(getContent(test['default.html'])).to.eql(trimContent(outputs.baseFileDefault));
            done();
        });
    });

    it('should throw an error when template is not found', (done) => {
        const test = {
            'default.md': {
                ...files['default.md'],
                rtemplate: 'Error.jsx'
            }
        }

        const plugin = index();

        plugin(test, metalsmith, (err) => {
            expect(err).to.not.be.eql(null);
            done();
        });
    });

    it('should be able to access yaml front matter parameters as variables in template', (done) => {
        const test = {
            'variable.md': {
                ...files['variable.md'],
                rtemplate: 'Variable.jsx'
            }
        }

        const plugin = index();

        plugin(test, metalsmith, () => {
            expect(getContent(test['variable.html'])).to.eql(trimContent(outputs.variable));
            done();
        });
    });

    it('should be able to access yaml front matter parameters as variables in baseFile', (done) => {
        const test = {
            'baseFile.md': {
                ...files['baseFile.md']
            }
        }

        const plugin = index();

        plugin(test, metalsmith, () => {
            expect(getContent(test['baseFile.html'])).to.eql(trimContent(outputs.baseFileDefault));
            done();
        });
    });

    it('should use template instead of the rtemplate parameter in from the yaml front matter ', (done) => {
        const plugin = index({noConflict: false});

        const test = {
            'template.md': {...files['template.md']}
        }

        plugin(test, metalsmith, () => {
            expect(getContent(test['template.html'])).to.eql(trimContent(outputs.other));
            done();
        });
    });

    it('should render react-ids if isStatic is set to false', (done) => {
        const test = {
            'baseFile.md': {
                ...files['baseFile.md']
            }
        }

        const plugin = index({isStatic: false});
        plugin(test, metalsmith, () => {
            const content = getContent(test['baseFile.html']);

            expect(content.match(/data-reactid/)).to.have.length.gt(0);
            expect(content.match(/data-react-checksum/)).to.have.length.gt(0);
            done();
        });
    });

    it('should render functional templates (react 0.14+)', (done) => {
        const plugin = index();

        const test = {
            'default.md': {
                ...files['default.md'],
                rtemplate: 'Functional.jsx'
            }
        }

        plugin(test, metalsmith, () => {
            expect(getContent(test['default.html'])).to.eql(trimContent(outputs.default));
            done();
        });
    });
});
