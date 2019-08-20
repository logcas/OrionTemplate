exports.definePluginConfig = () => ({
  PRODUCTION: `${process.env.NODE_ENV === 'production' ? true : false}`
});

exports.stats = {
  modules: false,
  children: false,
  chunks: false,
  chunkModules: false
};