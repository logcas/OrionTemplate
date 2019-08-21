const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const { resolve, getRewrite, getEntry } = require('./util');
const proxyTable = require('../config/proxy');
const { dev } = require('../config');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const devServer = Object.assign({
  host: 'localhost',
  port: 2019,
  open: true,
  hot: true,
  publicPath: '/',
  contentBase: resolve('static'),
  quiet: true
},{
  proxy: proxyTable
}, {
  historyApiFallback: {
    rewrites: getRewrite(getEntry())
  }
});

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    filename: '[name].js',
  },
  devServer,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here http://${devServer.host}:${devServer.port}`],
        notes: [`Powererd by Orion Vue.js Scaffold`]
      },
      clearConsole: true
    })
  ]
}, dev.webpackConfig || {});
