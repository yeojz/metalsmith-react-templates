import {expect} from 'chai';
import {spy} from 'sinon';
import registerExtensions from './registerExtensions';

describe('jsx-render-engine/core/registerExtensions', function () {
  it('should register babel and ignored extensions', function () {
    const registerExtensionWithTransformer = spy();
    const registerExtensionToIgnore = spy();
    registerExtensions.__Rewire__('registerExtensionWithTransformer', registerExtensionWithTransformer);
    registerExtensions.__Rewire__('registerExtensionToIgnore', registerExtensionToIgnore);

    const options = {
      requireTemplateExt: ['.jsx', 'jsx2'],
      requireIgnoreExt: ['.t1', '.t2'],
    }

    registerExtensions(options);

    registerExtensions.__ResetDependency__('registerExtensionWithTransformer');
    registerExtensions.__ResetDependency__('registerExtensionToIgnore');

    expect(registerExtensionWithTransformer.calledTwice).to.be.true;
    expect(registerExtensionToIgnore.calledTwice).to.be.true;
  });
});
