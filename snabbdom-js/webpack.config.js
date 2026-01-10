const path = require('path');

module.exports = (env) => {
  return {
    mode: 'development',
    entry: './index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname),
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname),
      },
      historyApiFallback: true,
      compress: true,
      port: 9000,
    },
    devtool: 'source-map',
  };
};
