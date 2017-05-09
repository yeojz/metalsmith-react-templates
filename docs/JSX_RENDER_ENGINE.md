# jsx-render-engine [![npm package][npm-badge]][npm-link]

> JSX library agnostic render engine. (react, preact, react-router etc.)

## About

`jsx-render-engine` is a an in-place object manipulation engine to transform object content using a JSX library as template.

It is developed as part of [metalsmith-react-templates](https://github.com/yeojz/metalsmith-react-templates).

You can easily write your own rendering strategies, but it currently supports the following out of the box:

-   [React](https://facebook.github.io/react/),
-   [Preact](https://www.npmjs.com/package/preact),
-   [React Router](https://www.npmjs.com/package/react-router)

## Installation

Install the library via:

```
$ npm install --save jsx-render-engine
```

You will need to install other dependencies based on your chosen templating engine. For example:

```
$ npm install react react-dom prop-types // react

$ npm install preact preact-render-to-string // preact

$ npm install react-router // and everything for react.
```

## Getting Started

```js
import Engine from 'jsx-render-engine';

const engine = new Engine(
  files, // see "File Objects" below
  context, // see "Context Object" below
  options // see available options in /core/options.js
);

engine.render('home');
engine.render('about');
```

### Object References

#### File Objects

```js
const files = {
  home: {
    title: 'test',
    template: 'HomeTemplate.jsx',
    content: 'markdown content'
  },
  about: {
    title: 'about',
    template: 'AboutTemplate.jsx',
    content: 'markdown content'
  }
}
```

#### Context Object

```js
const context = {
  path: (directory, file) => {},
  metadata: () => {}
}
```

## License

MIT [`License`](/LICENSE) © Gerald Yeo

[npm-badge]: https://img.shields.io/npm/v/jsx-render-engine.svg?style=flat-square
[npm-link]: https://www.npmjs.com/package/jsx-render-engine.svg
