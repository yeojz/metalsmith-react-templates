# metalsmith-react-templates
A templating plugin using React.js templates

[![npm](https://img.shields.io/npm/v/metalsmith-react-templates.svg?style=flat-square)](https://www.npmjs.com/package/metalsmith-react-templates)
[![Build Status](https://img.shields.io/travis/yeojz/metalsmith-react-templates.svg?style=flat-square)](https://travis-ci.org/yeojz/metalsmith-react-templates)
[![Code Climate](https://img.shields.io/codeclimate/github/yeojz/metalsmith-react-templates.svg?style=flat-square)](https://codeclimate.com/github/yeojz/metalsmith-react-templates)


## About
`metalsmith-react-templates` is a [metalsmith](http://www.metalsmith.io/) plugin to render files using [React](https://facebook.github.io/react/) based templates.


## Change Notice
As of `v3.0.0`, this plugin will only use `babel` as it's transpiler as `react-tools` will be deprecated from `0.14` onwards. Read more about this at React's blog: [Deprecating JSTransform and react-tools](https://facebook.github.io/react/blog/2015/06/12/deprecating-jstransform-and-react-tools.html)

As of `babel 6`, additional [plugin](https://babeljs.io/docs/plugins/) packages are needed for it to run. I've added the basic as peer dependency.


## Installation

```
npm install metalsmith-react-templates
```

## CLI Usage

  Install the node modules and then add the `metalsmith-react-templates` key to your `metalsmith.json` plugins. The simplest use case just requires the template engine you want to use:

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
var templates = require('metalsmith-react-templates');

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
If an `rtemplate` field is set in the `yaml` front-matter of your markdown files, `metalsmith-react-templates` will use the specified template instead of `default.jsx`.

You can also set `noConflict` to `false` and the plugin will use the `template` field instead of `rtemplate` field in the `yaml` front-matter.

### Webpack / Build Systems

If you import css or any other non-standard JavaScript code using `require`,
you might want to make use of the `requireIgnoreExt` to ignore those files.



## Options

#### `baseFile` (optional)
default: `null`

Specifies a file which the contents of the react template will render into.

This is similar to the `index.html` file which you `React.render()` your components in.

In your base file, put `{{content}}` in the location where you want your data will render into.


#### `isStatic` (optional)
default: `true`

Since this is a static site generator, by default, it will render the React Templates using `renderToStaticMarkup()`.

However, you may choose to make a static site generator with React functionalities (similar to first render from server) and subsequently pull page routes via JavaScript / React.

Setting this parameter to `false` will cause templates to be parsed using `renderToString()`.


#### `noConflict` (optional)
default: `true`

By default, this plugin will read from the `rtemplate` key in your `yaml`
front-matter. However, if this is the only templating plugin, you may
set `noConflict` to `false` to use the `template` key instead.


#### `directory` (optional)
default: `templates`

Sets the directory which your react templates (or baseFile) resides.


#### `pattern` (optional)
default: `**/*`

Specifies a file filter pattern.


#### `html` (optional)
default: `true`

Renames files from `*.md` to `*.html`.


#### `preserve` (optional)
default: `false`

Stores a copy of un-templated contents into `rawContents` meta.


#### `tooling` (optional)
default: `{}`



#### `requireIgnoreExt` (optional)
default: `[]`

A list of extensions to ignore. For example, `{requireIgnoreExt: ['.css']}` would
ignore declarations like `require('file.css')`




## Other Links
- [`License`](/LICENSE)



MIT © [Gerald Yeo](https://www.fusedthought.com)


