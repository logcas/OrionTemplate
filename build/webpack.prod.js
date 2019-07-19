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

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: '[name]_[chunkhash:8].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: resolve('public'),
      to: resolve('dist'),
      toType: 'dir'
    }]),
    new MiniCssExtractLoader({
      filename: 'style_[contenthash:8].css'
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['Build Successfully!']
      },
    })
  ]
});