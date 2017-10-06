const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config/webpack.common.js');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const output_path = './dist/debug'

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: output_path
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, output_path)
  },
  plugins: [
    new CleanWebpackPlugin([output_path]),
  ]
});