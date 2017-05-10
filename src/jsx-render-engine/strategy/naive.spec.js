import {expect} from 'chai';
import naiveTemplates from './naive';

describe('jsx-render-engine/strategy/naiveTemplates', function () {
  it('should replace value for predefined tag pattern', function (done) {
    naiveTemplates('{{tag}}', {tag: 'value'})
      .then((result) => {
        expect(result).to.eql('value');
        done();
      })
      .catch((err) => done(err));
  });

  it('should not have any changes to content', function (done) {
    naiveTemplates('{{random}}', {tag: 'value'})
      .then((result) => {
        expect(result).to.eql('{{random}}');
        done();
      })
      .catch((err) => done(err));
  });

  it('should replace value for custom tag patterns', function (done) {
    naiveTemplates('<!--tag-->', {tag: 'value'}, (v) => new RegExp(`<!--${v}-->`, 'g'))
      .then((result) => {
        expect(result).to.eql('value');
        done();
      })
      .catch((err) => done(err));
  });
});
