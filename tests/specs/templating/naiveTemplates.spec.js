import {expect} from 'chai';
import naiveTemplates from '../../../src/templating/naiveTemplates';

describe('naiveTemplates', () => {
  it('should replace value for predefined tag pattern', () => {
    const result = naiveTemplates('{{tag}}', {tag: 'value'});
    expect(result).to.eql('value');
  });

  it('should not have any changes to content', () => {
    const result = naiveTemplates('{{random}}', {tag: 'value'});
    expect(result).to.eql('{{random}}');
  });

  it('should replace value for custom tag patterns', () => {
    const result= naiveTemplates('<!--tag-->', {tag: 'value'}, (v) => new RegExp(`<!--${v}-->`, 'g'));
    expect(result).to.eql('value');
  });
});
