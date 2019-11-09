const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractLoader = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const {
  resolve
} = require('./util');
const { prod, uploadToCdn, cdnConfig } = require('../config');
const url = require('url');

if (uploadToCdn && !cdnConfig) {
  throw new Error('cdn config must be provided when using cdn uploading!');
}

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    publicPath: uploadToCdn ? url.resolve(cdnConfig.domain, prod.publicPath) : (prod.publicPath || '/')
  },
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: resolve('static'),
      to: resolve('dist'),
      toType: 'dir'
    }]),
    new MiniCssExtractLoader({
      filename: 'css/[name].[contenthash:8].css'
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['Build Successfully!']
      },
    })
  ]
}, prod.webpackConfig || {});