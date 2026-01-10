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
        'asm-dom-js-embind': path.resolve(__dirname, '../build/asm-dom-js-embind/Release/asm-dom-js-embind.js'),
      },
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, "../build/asm-dom-js-embind/Release/asm-dom-js-embind.wasm"), to: "asm-dom-js-embind.wasm" },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /asm-dom-js-embind\.wasm$/,
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
