var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/build/index.js',
  output: { path: __dirname + '/src/build/', filename: 'bundle.js' },
  watch: true,
  module: {
    rules: [
    {
      test: /.jsx?$/, 
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {presets: ['react']}
    },
    {
      test: /\.css$/,
      use:['style-loader','css-loader']
    }]
  },
 };
