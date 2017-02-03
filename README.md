# metalsmith-react-templates [![npm package][npm-badge]][npm-link]

A templating plugin using React.js templates

[![Build Status][build-badge]][build-link]
[![Coverage Status][coveralls-badge]][coveralls-link]
[![Code Climate][code-climate-badge]][code-climate-link]
[![npm downloads][npm-downloads-badge]][npm-downloads-link]
[![PRs Welcome][pr-welcome-badge]][pr-welcome-badge]

## About
`metalsmith-react-templates` is a [metalsmith](http://www.metalsmith.io/) plugin to render files using [React](https://facebook.github.io/react/) based templates.

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save metalsmith-react-templates

If you're using an older version of React, you may need to install an older version of this package.

| React Version | Package Version
-------|:-------|:-------
15.x.x | 5.x.x
0.14.x | 3.x.x or 4.x.x
0.13.x | 2.x.x
0.12.x | 1.x.x

If you're upgrading, you may want to check out the [Upgrade Notes](/docs/UPGRADE_NOTES.md)

## CLI Usage

Install the node modules and then add the `metalsmith-react-templates` key to your `metalsmith.json` plugins.

```json
{
  "plugins": {
    "metalsmith-react-templates": true
  }
}
```

If you want to specify additional options, pass an object:

```json
{
  "plugins": {
    "metalsmith-react-templates": {
      "baseFile": "base.html",
      "isStatic": true,
      "directory": "templates"
    }
  }
}
```

## JavaScript Usage

Simplest use case:

```js
import templates from 'metalsmith-react-templates';

metalsmith.use(templates());
```

To specify additional options:

```js
metalsmith.use(templates({
    baseFile: 'base.html'
    isStatic: true,
    directory: 'templates'
}));
```

## Usage Notes

### Specifying Templates

If an `rtemplate` field is set in the `yaml` front matter of your markdown files, `metalsmith-react-templates` will use the specified template instead of `Default.jsx`.

You can also set `noConflict` to `false` and the plugin will use the `template` field instead of `rtemplate` field in the `yaml` front matter.

### Webpack / Build Systems

If you import css or any other non-standard JavaScript code using `require`,
you might want to make use of the `requireIgnoreExt` to ignore those files.


## Options

All parameters are optional.

| Parameter | Default Value | Description
:-------------|:-------------|:-------------
| `baseFile` | `null` | Specifies a file which the contents of the react template will render into. <br /><br /> This is similar to the `index.html` file which you `React.render()` your components in. <br /><br /> In your base file, put `{{contents}}` in the location where you want your data will render into. <br /><br /> You may also override this value by placing a baseFile key in your source file's front matter.
| `baseFileDirectory` | `null` | Sets the directory which your baseFile resides. By default, it assumes your base file is in the same directory as your templates.
| `defaultTemplate` | `Default.jsx` | The default template file to use if no template is specified. <br /><br /> Set to `''` or `null` if you do not want metalsmith to not apply template transformation on files that do not have a 'template / rtemplate' key present.
| `directory` | `templates` | Sets the directory which your react templates resides.
| `extension` | `.html` | Option to rename your files to a specified extension. Set to `null` if you do not want to change the file extension
| `isStatic` | `true` | Since this is a static site generator, by default, it will render the React Templates using `renderToStaticMarkup()`. <br /><br /> However, you may choose to make a static site generator with React functionalities (similar to first render from server) and subsequently pull page routes via JavaScript / React.<br /><br /> Setting this parameter to `false` will cause templates to be parsed using `renderToString()`.
| `noConflict` | `true` | By default, this plugin will read from the `rtemplate` key in your `yaml` front matter. However, if this is the only templating plugin, you may set `noConflict` to `false` to use the `template` key instead.
| `pattern` | `**/*` | Specifies a file filter pattern.
| `preserve` | `false` | Stores a copy of un-templated contents into `rawContents` meta which you can access in your React components.
| `propsKey` | `null` | Specifies a key containing the props to provide to the template. If left unspecified, a generic props containing all keys is provided.
| `requireIgnoreExt` | `[ ]` | A list of extensions to ignore. <br /><br /> For example, `{requireIgnoreExt: ['.css']}` would ignore declarations like `require('file.css')`
| `templateTag` | `null` | Accepts a function `pattern(key)` which returns a regex object used to find and replace template tags in your output file. <br /><br /> By default, template tags are assumed to be `{{tag}}`. You may use this to allow for other tag formats (eg. you may want `<!--tag-->` instead). <br /> <br /> Check the test case for an example.
| `tooling` | `{ }` | Options to pass into the `babel` transpiler.

## License

MIT [`License`](/LICENSE) © Gerald Yeo

[npm-badge]: https://img.shields.io/npm/v/metalsmith-react-templates.svg?style=flat-square
[npm-link]: https://www.npmjs.com/package/metalsmith-react-templates

[build-badge]: https://img.shields.io/circleci/project/github/yeojz/metalsmith-react-templates.svg?style=flat-square
[build-link]: https://circleci.com/gh/yeojz/metalsmith-react-templates

[coveralls-badge]: https://img.shields.io/coveralls/yeojz/metalsmith-react-templates.svg?style=flat-square
[coveralls-link]: https://coveralls.io/github/yeojz/metalsmith-react-templates

[code-climate-badge]: https://img.shields.io/codeclimate/github/yeojz/metalsmith-react-templates.svg?style=flat-square
[code-climate-link]: https://codeclimate.com/github/yeojz/metalsmith-react-templates

[npm-downloads-badge]: https://img.shields.io/npm/dt/metalsmith-react-templates.svg?style=flat-square
[npm-downloads-link]: https://www.npmjs.com/package/metalsmith-react-templates

[pr-welcome-badge]: https://img.shields.io/badge/PRs-Welcome-ff69b4.svg?style=flat-square
[pr-welcome-link]: https://github.com/yeojz/metalsmith-react-templates/blob/master/CONTRIBUTING.md
