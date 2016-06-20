'use strict'

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
  entry: "./js/main",
  output: {
    filename: "js/index.js",
    library: "spa"
  },

  watch: NODE_ENV == 'development',
  watchOptions: {
    aggregateTimeout: 100
  },
  devtool: NODE_ENV == 'development' ? 'source-map' : null,

  // plugins: [
  //   new webpack.EnvironmentPlugin('NODE_ENV', 'USER')
  // ]

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  }

};
