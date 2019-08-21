const { resolve, getEntry, getHtmlWebpackPluginSet } = require('./util');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractLoader = require('mini-css-extract-plugin');

const { definePluginConfig, stats } = require('./config');

const { useESLint } = require('../config');

const cssLoadersGenerator = loaders => [
  process.env.NODE_ENV === 'production'
    ? MiniCssExtractLoader.loader
    : 'vue-style-loader',
  'css-loader',
  'postcss-loader',
  ...loaders
];

const rules = [
  {
    test: /.vue$/,
    loader: 'vue-loader'
  },
  {
    test: /.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel-loader'
  },
  {
    test: /.css$/,
    use: cssLoadersGenerator([])
  },
  {
    test: /.scss$/,
    use: cssLoadersGenerator(['sass-loader'])
  },
  {
    test: /.sass$/,
    use: cssLoadersGenerator([
      {
        loader: 'sass-loader',
        options: {
          indentedSyntax: true
        }
      }
    ])
  },
  {
    test: /.less%/,
    use: cssLoadersGenerator(['less-loader'])
  },
  {
    test: /\.styl(us)?$/,
    use: cssLoadersGenerator(['stylus-loader'])
  },
  {
    test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        }
      }
    ]
  },
  {
    test: /\.(svg)(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'img/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'media/[name].[hash:8].[ext]'
            }
          }
        }
      }
    ]
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:8].[ext]'
            }
          }
        }
      }
    ]
  }
];

const entry = getEntry();

module.exports = {
  entry,
  output: {
    path: resolve('dist'),
    publicPath: '/',
    globalObject: 'this'
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: rules.concat(
      useESLint
        ? {
            enforce: 'pre',
            test: /.(js|vue)$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
          }
        : {}
    )
  },
  plugins: [
    ...getHtmlWebpackPluginSet(entry),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin(definePluginConfig()),
    new ProgressPlugin()
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js',
      '@': resolve('src'),
      components: resolve('src/components'),
      views: resolve('src/views'),
      assets: resolve('src/assets'),
      request: resolve('src/request'),
      services: resolve('src/services')
    },
    extensions: ['.mjs', '.js', '.jsx', '.vue', '.json', '.wasm']
  },
  stats
};
