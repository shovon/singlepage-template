const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/ts/entry.ts',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?'+JSON.stringify({
          presets: [ 'es2015' ]
        })
      },
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ]
};
