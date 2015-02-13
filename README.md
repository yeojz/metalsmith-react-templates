# metalsmith-react-templates

  A metalsmith plugin to render files using ReactJS based templates.
  It is a drop-in replacement for `metalsmith-templates` that focuses only on React JS as a templating tool.


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
      "baseFile": "base.html"
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