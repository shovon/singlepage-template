const path = require('path');

module.exports = {
  entry: './src/ts/entry.ts',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?'+JSON.stringify({
          presets: [ 'es2015' ]
        })
      },
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
};
