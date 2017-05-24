import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';

/**
 * Filters out all null/undefined items from the given array.
 */
function removeNil(as) {
  return as.filter(a => a != null);
}

export default function (env) {
  const isProd = env === 'prod';
  const isDev = !isProd;

  console.log(`==> Creating ${isProd ? 'an optimized' : 'a development'} bundle configuration.`);

  const webpackConfig = {
    // main.js is the root level entry point referenced in index.html.
    entry: removeNil([
      'regenerator-runtime/runtime',
      // activate HMR for React
      isDev ? 'react-hot-loader/patch' : null,

      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      isDev ? 'webpack-dev-server/client?http://localhost:8080' : null,

      './main.js',
    ]),

    // All build output is put in client/build. Any asyncronously loaded
    // modules are bundled in chunks and placed there. Those chunks are
    // named with a hash.
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: '/',
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
        // additional webpackConfiguration option is some non-current examples that tells
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
          // loader: 'happypack/loader?id=happypack-javascript',
          options: {
            presets: ['es2015', 'react'],
            plugins: ['syntax-dynamic-import'],
          },
        },
      ],
    },

    // cheap-module-source-map just maps lines to original files. For
    // development builds, this is overriden.
    devtool: isDev ? 'inline-source-map' : 'hidden-source-map',

    plugins: [
      // This plugin allows dependencies to be shared across bundled
      // chunks. The options tell the plugin that async-loaded modules
      // should be included (using the import()) syntax and that all
      // children of the entry point are to be considered.
      new webpack.optimize.CommonsChunkPlugin({
        children: true,
        async: true,
      }),

      // Automatically generates HTML file
      new HtmlWebpackPlugin({
        template: './index.ejs',
        alwaysWriteToDisk: true,
      }),
    ],
  };

  if (isProd) {
    /* Webpack Options for Production */
    webpackConfig.output = {
      path: path.resolve(__dirname, 'build'),
      // For our production client bundles we include a hash in the filename.
      // That way we won't hit any browser caching issues when our bundle
      // output changes.
      // Note: as we are using the WebpackMd5Hash plugin, the hashes will
      // only change when the file contents change. This means we can
      // set very aggressive caching strategies on our bundle output.
      filename: '[name]-[chunkhash].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: '/',
    };

    // Production builds are uglified using a source map that gives the
    // original lines of code.
    webpackConfig.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: 'cheap-module-source-map',
      }),
      new WebpackMd5Hash(),
    );
  } else {
    /* Webpack Options for Development */

    // Enable awesomesauce source maps. This should link to the
    // pre-transpiled code.
    webpackConfig.devServer = {
      // webpackConfigure hot swap dev server. See the documentation.
      hot: true,
      contentBase: webpackConfig.output.path,
      publicPath: webpackConfig.output.publicPath,
      historyApiFallback: true,
    };

    // for webpack HMR reload, we need to always write this file to disk in dev mode
    webpackConfig.plugins.push(
      new HtmlWebpackHarddiskPlugin({
        outputPath: path.resolve(__dirname, 'build'),
      }),
    );

    // enable HMR globally
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    // prints more readable module names in the browser console on HMR updates
    webpackConfig.plugins.push(new webpack.NamedModulesPlugin());
  }

  console.log('webpackConfig.entry.index', webpackConfig.entry.index);
  return webpackConfig;
}
