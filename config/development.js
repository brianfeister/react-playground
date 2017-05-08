'use strict';

const webpack = require('webpack');
const path = require('path');

const base = path.resolve(__dirname, '..', 'client');
const source = path.join(base, 'source');
const build = path.join(base, 'build');

module.exports = {
  webpack: {
    devtool: 'inline-source-map',
    devServer: {
      hot: true,
      contentBase: build,
      publicPath: '/'
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({ children: true, async: true }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.HtmlWebpackPlugin({
        
      }),
    ]
  }
};
