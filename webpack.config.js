const path = require('path');

module.exports = {
  entry: './lib/entry.js',
  output: {
    filename: './lib/bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
