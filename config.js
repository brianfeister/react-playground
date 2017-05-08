'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = env => {

  const config = {

    // client/source/main.js is the root level entry point referenced in index.html.
    entry: path.resolve(__dirname, '..', 'client', 'source', 'main.js'),

    // All build output is put in client/build. Any asyncronously loaded
    // modules are bundled in chunks and placed there. Those chunks are
    // named with a hash.
    output: {
      path: path.resolve(__dirname, '..', 'client', 'build'),
      filename: '[name].js',
      chunkFilename: '[chunkhash].js',
      publicPath: '/'
    },

    module: {
      rules: [

        // Javascript files are run through es2015 and react
        // transpiling. This matches all .js files in the project and
        // pipes them into babel.

        // Note that es6 imports are left in place for webpack to
        // handle. Having babel transpile imports prevents webpack from
        // being able to statically resolve and bundle es6 import
        // dependencies so we leave the transpiling up to webpack.

        // There were recent changes to the es2015 plugin that now
        // doesn't transpile es6 import by default. You may see an
        // additional configuration option is some non-current examples that tells
        // babel to leave them in place.

        // The "syntax-dynamic-import" plugin stops babel from throwing
        // an error about using an import() function. The import
        // function is almost identical to System.import() (see webpack
        // docs). Webpack statically inspects the files and uses the
        // import() statements to build the dependency tree and creates
        // bundle breakpoints when an import() is encountered. SystemJS
        // support is deprecated so we will use the built in webpack
        // "import()" syntax.

        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
            syntax: ['syntax-dynamic-import']
          }
        }
      ]
    },

    // cheap-module-source-map just maps lines to original files. For
    // development builds, this is overriden.
    devtool: 'cheap-module-source-map',

    plugins: [

      // This plugin allows dependencies to be shared across bundled
      // chunks. The options tell the plugin that async-loaded modules
      // should be included (using the import()) syntax and that all
      // children of the entry point are to be considered.
      new webpack.optimize.CommonsChunkPlugin({
        children: true,
        async: true
      })

    ]
  };

  console.log('HI!');




  if (env === 'prod') {

    /* Webpack Options for Production */

    // Production builds are uglified using a source map that gives the
    // original lines of code.
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: 'cheap-module-source-map'
    }));

  } else {

    /* Webpack Options for Development */

    // Enable awesomesauce source maps. This should link to the
    // pre-transpiled code.
    config.devtool = 'inline-source-map',

    // Configure hot swap dev server. See the documentation.
    config.devServer = {
      hot: true,
      contentBase: config.output.buildPath,
      publicPath: config.output.publicPath
    };

    // Enable ability to hotswap modules when changes occur.
    config.plugins.push(new webpack.HotModuleReplacementPlugin());

  }

  return config;

};
