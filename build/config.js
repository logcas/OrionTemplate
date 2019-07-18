exports.definePluginConfig = () => ({
  PRODUCTION: `${process.env.NODE_ENV === 'production' ? true : false}`
});
