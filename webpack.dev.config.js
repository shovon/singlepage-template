const config = require('./webpack.default.js');
const objectAssign = require('object-assign');

module.exports = objectAssign({}, { devtool: '#source-map' }, config);
