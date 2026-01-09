const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

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
    resolve: {
      extensions: ['.js', '.wasm'],
      alias: {
        'wasm-dom-js': path.resolve(__dirname, '../build/wasm-dom-js/Release/wasm-dom-js.js'),
      },
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, "../build/wasm-dom-js/Release/wasm-dom-js.wasm"), to: "wasm-dom-js.wasm" },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /wasm-dom-js\.wasm$/,
          type: 'webassembly/async',
        },
      ],
    },
    experiments: {
      asyncWebAssembly: true,
      syncWebAssembly: true,
    },
  };
};
