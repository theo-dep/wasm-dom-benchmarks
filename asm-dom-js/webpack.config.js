const path = require('path');
const webpack = require('webpack');

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
    module: {
      rules: [
        {
          test: /\.wasm$/,
          type: 'webassembly/async',
        },
      ],
    },
    resolve: {
      alias: {
        'node:stream': 'stream',
      },
      fallback: {
        "path": require.resolve("path-browserify"),
        "fs":  require.resolve("browserify-fs"),
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer/"),
        "process": require.resolve("process/browser"),
        "util": require.resolve("util/"),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser',
      }),
    ],
    experiments: {
      asyncWebAssembly: true,
    },
  };
};
