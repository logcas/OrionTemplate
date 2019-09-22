const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackDefaultOptions = {
  minify: {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true
  }
};

const resolve = (...p) => path.resolve(__dirname, '..', ...p);
exports.resolve = resolve;

exports.PRODUCTION = process.env.NODE_ENV === 'production';

exports.getEntry = function () {
  const customsEntries = require('../config/entry');
  // 如果自定义了入口文件，就不会扫描 src/applications 目录
  if (Reflect.ownKeys(customsEntries).length !== 0) {
    return customsEntries;
  }
  // 没有自定义入口，默认扫描 src/applications 目录
  const applicationsPath = resolve('src', 'applications');
  const apps = fs.readdirSync(applicationsPath);
  const entries = {};
  for (let i = 0; i < apps.length; ++i) {
    const entry = apps[i];
    if (path.extname(entry) !== '.js') {
      continue;
    }
    entries[entry.slice(0, -3)] = path.join(applicationsPath, entry);
  }
  return entries;
};

exports.getHtmlWebpackPluginSet = function (entries) {
  let entryName = [];
  if (typeof entries === 'object' && entries !== null) {
    entryName = Reflect.ownKeys(entries);
  } else {
    entryName = [...entries];
  }
  const htmlWebpackPluginOptions = require('../config/html.config');
  const templatesPath = resolve('src', 'templates');
  let templates = fs.readdirSync(templatesPath);
  templates = templates.filter(name => path.extname(name) === '.html');
  const htmlWebpackPluginSet = [];

  function generateInstance(entry, options = {}) {
    return new HtmlWebpackPlugin(
      Object.assign(htmlWebpackDefaultOptions, options, {
        filename: entry + '.html',
        template: path.join(
          templatesPath,
          templates.includes(`${entry}.html`) ?
          entry + '.html' :
          '__default__.html'
        ),
        excludeChunks: entryName.filter(n => n !== entry),
        // fix Error: Cyclic dependency
        // solution: https://blog.csdn.net/alanfancy/article/details/84023940 
        chunksSortMode: 'none'
      })
    );
  }

  for (let i = 0; i < entryName.length; ++i) {
    htmlWebpackPluginSet.push(generateInstance(entryName[i], htmlWebpackPluginOptions[entryName[i]]));
  }
  return htmlWebpackPluginSet;
};

exports.getRewrite = function (entry) {
  let __entries__;
  if (typeof entry === 'object' && entry !== null) {
    __entries__ = Reflect.ownKeys(entry);
  } else {
    __entries__ = [...entry];
  }
  const rewriteMap = [];
  __entries__.forEach(entryName => {
    rewriteMap.push({
      from: new RegExp(`^/\/${entryName}/.*$`, ''),
      to: `/${entryName}.html`
    });
  });
  return rewriteMap;
};