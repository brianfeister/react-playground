'use strict';

const webpack = require('webpack');

module.exports = {
  webpack: {
    devtool: 'eval',
    devServer: null,
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({ children: true, async: true }),
      new webpack.optimize.UglifyJsPlugin({ sourceMap: 'eval' })
    ]
  }
};
