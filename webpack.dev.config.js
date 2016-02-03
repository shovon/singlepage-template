// const path = require('path');
const config = require('./webpack.default.js');
const objectAssign = require('object-assign');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = objectAssign({}, { devtool: '#source-map' }, config);

// module.exports = {
//   entry: './src/ts/entry.ts',
//   output: {
//     path: path.resolve(__dirname, 'public'),
//     filename: 'bundle.js'
//   },
//   devtool: "#source-map",
//   module: {
//     loaders: [
//       { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") },
//       { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
//       {
//         test: /\.js$/,
//         exclude: /(node_modules|bower_components)/,
//         loader: 'babel?'+JSON.stringify({
//           presets: [ 'es2015' ]
//         })
//       },
//       { test: /\.ts$/, loader: 'ts-loader' }
//     ]
//   },
//   plugins: [
//     new ExtractTextPlugin("styles.css")
//   ]
// };
