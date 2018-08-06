var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: { path: __dirname + '/src', filename: 'react-app.js' },
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