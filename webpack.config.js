module.exports = {
  entry: './public/index.js',
  output: { path: __dirname + '/public', filename: 'bundle.js' },
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
