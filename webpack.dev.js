const path = require('path');
const merge = require('webpack-merge'); //引入merge工具
const common = require('./webpack.config/webpack.common.js'); //引入共同配置

const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin'); //引入清除插件

const output_path = './dist/debug'  //定义输出目录

module.exports = merge(common, {  //合并配置后exports
  devtool: 'inline-source-map',   //指定sourcemap方式
  devServer: {
    contentBase: output_path      //指定调试用server文件跟路径
  },
  output: {
    filename: '[name].bundle.js', //指定输出文件名
    path: path.resolve(__dirname, output_path)  //指定输出文件目录
  },
  plugins: [
    new CleanWebpackPlugin([output_path]),  //加载清理插件。插件会清理输出目录。
    new ExtractTextPlugin("[name].css"),  //提取CSS
  ]
});