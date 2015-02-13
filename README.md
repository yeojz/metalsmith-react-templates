# metalsmith-react-templates
A templating plugin using React.js templates



## About
`metalsmith-react-templates` is a [metalsmith](http://http://www.metalsmith.io/) plugin to render files using [React.js](http://http://facebook.github.io/react/) based templates. 



## Installation

    $ npm install metalsmith-react-templates

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
    "metalsmith-templates": {
      "baseFile": "base.html",
      "nonStatic": false,
      "directory": "templates"
    }
  }
}
```

## Javascript Usage

  For the simplest use case, just pass your templating engine:

```js
var templates = require('metalsmith-react-templates');

metalsmith.use(templates());
```

  To specify additional options:

```js
metalsmith.use(templates({
  baseFile: 'base.html'
  nonStatic: false,
  directory: 'templates'
}));
```



### Options

#### `baseFile` (optional)
( default: *null* )

- Specifies a file which the contents of the react template will render into. 
- This is similar to the index.html file which you React.render() your components in.


#### `nonStatic` (optional) 
( default: *false* )

- Since this is a static site generator, by default, it will render the React Templates using `renderToStaticMarkup()`
- However, you may choose to make a static site generator with React functionalities (similar to first render from server) and subsequently pull page routes via JavaScript / React.
- Setting this parameter to true will cause templates to be parsed using `renderToString()`


#### `directory` (optional) 
( default: *'templates'* )

- Sets the directory which your react templates (or baseFile) resides.

#### `pattern` (optional)
( default: *null* )

- specifies a file filter pattern

## Other Usage Notes

### Specifying Templates
If a `template` field is set in the `yaml` front-matter of your markdown files, `metalsmith-react-templates` will use the specified template instead of `default.jsx`



## Other Links
- [`License`](/LICENSE.md)






