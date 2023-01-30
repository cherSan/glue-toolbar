const { withModuleFederation } = require('@nrwl/angular/module-federation');
module.exports = (config, additional = {}) => ({
  ...withModuleFederation(config),
  ...additional,
  resolve: {
    fallback: {
      zlib: require.resolve('browserify-zlib'),
      assert: require.resolve('assert-browserify'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('http-browserify'),
      https: require.resolve('https-browserify'),
      fs: require.resolve('browserify-fs'),
      path: require.resolve('path-browserify'),
      url: require.resolve('browserify-url'),
      net: require.resolve('net-browserify'),
      tls: require.resolve('browserify-tls')
    },
  },
});
