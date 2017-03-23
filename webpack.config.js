const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'browser.js',
    path: path.resolve(__dirname, '.'),
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  externals: {
    forgiven: true,
  },
  devtool: 'eval-source-map',
};
