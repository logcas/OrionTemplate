const { usePx2rem, px2remConfig } = require('./config');

/*
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')
  ].concat(usePx2rem ? [
    require('postcss-pxtorem')({

    })
  ])
};
*/

module.exports = {
  plugins: {
    autoprefixer: {},
    cssnano: {},
    ...(usePx2rem
      ? {
          'postcss-pxtorem': Object.assign(
            {
              rootValue: 75,
              unitPrecision: 5,
              propList: ['*']
            },
            px2remConfig || {}
          )
        }
      : {})
  }
};
