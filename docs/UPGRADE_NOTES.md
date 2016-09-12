# Upgrade Notes

Only key upgrade points are written here. To view the change log, please visit the [release page](https://github.com/yeojz/metalsmith-react-templates/releases)

## v5.0.0
 - The `html` option has been dropped. In replacement `extensions` has been defaulted to `.html`.
 - `propKeys` option has been tweaked.
   - It now accepts an array of keys to pick
   - Giving a string key would return `{key: value}` instead of just the `value`.

## v4.1.2
 - Support for React 15 is implicit. i.e. No change in code base. Which explains the patch version bump.

## v3.1.5
 - Babel and react are now peer dependencies
 - For `babel 6`, additional [plugin](https://babeljs.io/docs/plugins) packages are needed for it to run properly

## v3.0.0
 - From this version, this plugin will only use `babel` as it's transpiler as `react-tools` will be deprecated from `0.14` onwards. Read more about this at React's blog: [Deprecating JSTransform and react-tools](https://facebook.github.io/react/blog/2015/06/12/deprecating-jstransform-and-react-tools.html)
