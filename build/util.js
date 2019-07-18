const path = require('path');

exports.resolve = (...p) => path.resolve(__dirname, '..', ...p);

exports.PRODUCTION = process.env.NODE_ENV === 'production';