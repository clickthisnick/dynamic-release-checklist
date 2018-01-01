const path = require('path');

module.exports = {
  entry: './checklist.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '.'),
  },
}
