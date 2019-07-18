const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const { resolve } = require('./util');
const proxyTable = require('../config/proxy');

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    filename: '[name].js',
  },
  devServer: {
    port: 2019,
    hot: true,
    publicPath: '/',
    contentBase: resolve('dist'),
    proxy: proxyTable
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
