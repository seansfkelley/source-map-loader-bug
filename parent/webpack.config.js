module.exports = {
  entry: {
    main: './index.js',
  },
  output: {
    filename: '[name].js',
  },
  resolve: {
    alias: {
      'left-pad': __dirname + '/node_modules/left-pad'
    }
  },
  module: {
    loaders: [
      { test: /node_modules.*\.js$/, loader: 'source-map-loader' }
    ]
  }
};
