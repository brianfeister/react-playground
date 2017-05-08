'use strict';

const path = require('path');

const base = path.resolve(__dirname, '..', 'client');
const source = path.join(base, 'source');
const build = path.join(base, 'build');

module.exports = {
  webpack: {
    entry: path.join(source, 'main.js'),
    output: {
      path: build,
      filename: '[name].js',
      chunkFilename: '[chunkhash].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
            plugins: ['syntax-dynamic-import']
          }
        }
      ]
    }
  }
};
