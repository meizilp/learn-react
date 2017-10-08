const path = require('path');
const webpack = require('webpack'); //引入webpack，以使用内置插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入生成页面插件
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.tsx',   //程序入口文件
  },
  plugins: [
    //生成index.html
    new HtmlWebpackPlugin({
      title: 'webpack performance',
      filename: 'index.html',
      template: './src/index.ejs',
      inject: true,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
      },
    }),  
    //将dll目录的所有库文件复制到输出目录，并加入index.html
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, '../dll/!(dll-runtime)*.dll.js'),
      includeSourcemap: false
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, '../dll/dll-runtime*.dll.js'),
      includeSourcemap: false
    }),
    //提取重复的webpack脚手架文件
    new webpack.optimize.CommonsChunkPlugin({ 
      name: 'runtime',      //使用一个entry中没有的名称
      minChunks: Infinity 
    }),
    //加载预先编译好的dll库公共代码
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require("../dll/dll-runtime.manifest.json"),
    }),
    //加载预先编译好的react库
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require("../dll/reacts.manifest.json"),
    }),
    //加载预先编译好的antd库
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require("../dll/antd.manifest.json"),
    }),
  ],

  module: {
    rules: [  //ts以及tsx文件通过一个loader处理；js文件通过sourcemap转换处理
      { test: /\.tsx?$/, use: 'awesome-typescript-loader', exclude: /node_modules/ },
      { test: /\.js$/, use: 'source-map-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader" }) } //提取css
    ]
  },
  resolve: {  //库的解析扩展名增加tsx以及ts类型的文件
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  }
};