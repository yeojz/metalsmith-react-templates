const path = require('path');
const webpack = require('webpack');

const ENV = process.env.NODE_ENV;
const ROOT_FOLDER = path.resolve(__dirname);
const BUILD_FOLDER = path.join(ROOT_FOLDER, 'build');

let alias = {};

module.exports = {
  entry: [
    path.join(ROOT_FOLDER, 'scripts', 'loader.js')
  ],
  output: {
    libraryTarget: 'umd',
    path: BUILD_FOLDER,
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)?$/,
      exclude: /node_modules/,
      use: [
        'babel-loader',
      ]
    }]
  },
  resolve: {
    alias: alias
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    })
  ],
  devtool: 'cheap-module-source-map',
  target: 'web'
};
