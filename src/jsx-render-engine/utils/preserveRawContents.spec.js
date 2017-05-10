import {expect} from 'chai';
import {spy} from 'sinon';
import preserveRawContents from './preserveRawContents';

describe('jsx-render-engine/utils/preserveRawContents', function () {

  it('should copy contents over to rawContents', function () {
    const syntheticFile = createSyntheticFile(true);
    preserveRawContents(syntheticFile);

    expect(syntheticFile.data.rawContents).to.equal('original');
  });

  it('should not copy contents over to rawContents', function () {
    const syntheticFile = createSyntheticFile(false);
    preserveRawContents(syntheticFile);
    expect(syntheticFile.data.rawContents).to.equal('nothing');
  });

  function createSyntheticFile(preserve) {
    return {
      options: {
        debug: spy(),
        preserve: preserve
      },
      data: {
        contents: 'original',
        rawContents: 'nothing'
      }
    }
  }
});
