const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = function override(config, env) {
  // Add fallbacks for Node.js core modules
  config.resolve = {
    ...config.resolve,
    fallback: {
      ...config.resolve.fallback,
      assert: require.resolve('assert/'),
      buffer: require.resolve('buffer/'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      process: require.resolve('process/browser.js'), // ✅ FIXED: added .js extension
      vm: require.resolve('vm-browserify'),
    },
  };

  // Provide global polyfills for Buffer and process
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser.js', // ✅ FIXED: added .js extension
    }),
    ...(env === 'development'
      ? [
          new ReactRefreshWebpackPlugin({
            overlay: false,
          }),
        ]
      : []),
  ];

  // Suppress source map parsing warnings
  config.ignoreWarnings = [
    ...(config.ignoreWarnings || []),
    /Failed to parse source map/,
  ];

  return config;
};
