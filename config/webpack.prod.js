const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin');
const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

const METADATA = Object.assign({}, {
  ENV: ENV,
  PUBLIC_PATH: process.env.PUBLIC_PATH || '/',
  LAUNCHER_BACKEND_URL: process.env.LAUNCHER_BACKEND_URL || 'http://backend-public-devex.195.201.87.126.nip.io/api',
  LAUNCHER_KEYCLOAK_URL: process.env.LAUNCHER_KEYCLOAK_URL,
  LAUNCHER_KEYCLOAK_REALM: process.env.LAUNCHER_KEYCLOAK_REALM,
  LAUNCHER_KEYCLOAK_CLIENT_ID: process.env.LAUNCHER_KEYCLOAK_CLIENT_ID || '',
  LAUNCHER_FRONTEND_SENTRY_DSN: process.env.LAUNCHER_FRONTEND_SENTRY_DSN
});

module.exports = webpackMerge(commonConfig({ env: ENV, metadata: METADATA  }), {
  devtool: 'source-map',
  output: {
    path: helpers.root('dist'),
    publicPath: METADATA.PUBLIC_PATH,
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },
  plugins: [
    new PurifyPlugin(),
    new HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({ filename: '[name]-[hash].css', chunkFilename: '[name]-[chunkhash].css' }),
    new UglifyJsPlugin({
      sourceMap: true,
      parallel: true,
      uglifyOptions: {
        ecma: 5,
        warnings: false,
        ie8: false,
        mangle: true,
        compress: {
          pure_getters: true,
          passes: 3
        },
        output: {
          ascii_only: true,
          comments: false
        }
      }
    })
  ],
  node: {
    global: true,
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false,
    fs: 'empty'
  }
});
