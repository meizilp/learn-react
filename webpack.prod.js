const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config/webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const output_path = './dist/release'

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin([output_path]),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: true
      }
    })
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, output_path)
  },
});