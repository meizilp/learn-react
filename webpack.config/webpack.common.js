const path = require('path');
const webpack = require('webpack'); //引入webpack，以使用内置插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入生成页面插件
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const index_html_options = {  //生成index.html的配置
  minify: {
    collapseWhitespace: true,
    preserveLineBreaks: true,
  },
  inject: false,
  template: require('html-webpack-template'),   //生成页面时通过template生成
  cache: true,

  //template配置
  appMountIds: ['main', 'component', 'form', 'simple'],   //在页面中生成div
  lang: 'zh-CN',    //指定页面语言

  title: 'My react project',  //指定页面title
  filename: "index.html"  //指定输出的html页面文件名
}

module.exports = {
  entry: {
    app: './src/index.tsx',   //程序入口文件
  },
  plugins: [
    //new HtmlWebpackPlugin(index_html_options),  //生成index.html
    new HtmlWebpackPlugin({
      title: 'webpack performance',
      filename: 'index.html',
      template: './src/index.ejs',
      inject: true,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
      },
    }),  //生成index.html
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, '../dll/*.dll.js'),
      includeSourcemap: false
    }),
    new webpack.optimize.CommonsChunkPlugin({ //提取重复的webpack脚手架文件
      name: 'runtime',  //使用一个entry中没有的名称
      minChunks: Infinity
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require("../dll/antd.manifest.json"),
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require("../dll/reacts.manifest.json"),
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