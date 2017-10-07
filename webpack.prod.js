const path = require('path');
const merge = require('webpack-merge'); //引入merge工具
const common = require('./webpack.config/webpack.common.js'); //引入共同配置
const CleanWebpackPlugin = require('clean-webpack-plugin'); //引入清理插件
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const ExtractTextPlugin = require("extract-text-webpack-plugin")  //引入CSS提取插件
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');  //引入代码优化插件
const webpack = require('webpack'); //要使用webpack内置插件，引入webpack对象

var CopyWebpackPlugin = require('copy-webpack-plugin');

const output_path = './dist/release'  //定义输出目录

module.exports = merge(common, {
  devtool: 'source-map',    //定义sourcemap类型。
  plugins: [
    new CleanWebpackPlugin([output_path]),  //清理输出目录
    //new CopyWebpackPlugin([{ from: './dll/*.dll.js', to: './' }]),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname,'./dll/*.dll.js'),
    }),
    // new HtmlWebpackIncludeAssetsPlugin({
    //   assets: ['dll/*.dll.js'],
    //   append: true
    // }),
    new ExtractTextPlugin("[name].[chunkhash].css"),  //提取CSS
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')  //通过环境变量定义生产环境
      }
    }),
    //给module一个固定id，确保module内容不变化时其hash值也不变化。
    //如果不使用这个插件，那么受webpack的脚手架代码影响，module内容不变，hash值也可能变。
    new webpack.HashedModuleIdsPlugin(),
    new UglifyJSPlugin({  //代码优化
      sourceMap: true,
      uglifyOptions: {
        compress: true
      }
    })
  ],
  output: {
    filename: '[name].[chunkhash].js',  //定义输出文件名，加上了hash值。
    path: path.resolve(__dirname, output_path)  //定义输出目录
  },
});