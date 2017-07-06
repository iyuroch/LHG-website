var path = require('path');


module.exports = {
  devServer: {
    contentBase: '.',
    port: 9000,
    historyApiFallback: true,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  entry: './app/index.js'
};
