import {expect} from 'chai';
import naiveTemplates from '../../src/naiveTemplates';

describe('naiveTemplates', () => {

    it('should replace value for predefined tag pattern', () => {
        const result = naiveTemplates('{{tag}}', {tag: 'value'});

        expect(result.tag).to.eql('value');
        expect(result.contents.toString()).to.eql('value');
    });

    it('should not have any changes to content', () => {
        const result = naiveTemplates('{{random}}', {tag: 'value'});

        expect(result.tag).to.eql('value');
        expect(result.contents.toString()).to.eql('{{random}}');
    });

    it('should replace value for custom tag patterns', () => {
        const result= naiveTemplates('<tag>', {tag: 'value'}, (v) => new RegExp(`<${v}>`, 'g'));

        expect(result.tag).to.eql('value');
        expect(result.contents.toString()).to.eql('value');
    })
});
