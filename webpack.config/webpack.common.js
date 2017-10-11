const path = require('path');
const webpack = require('webpack'); //引入webpack，以使用内置插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入生成页面插件
const ExtractTextPlugin = require("extract-text-webpack-plugin") //CSS等提取插件
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin') //向生成的html添加引用

module.exports = {
  entry: {
    app: './src/index.tsx',   //程序入口文件
  },
  plugins: [
    //生成index.html。为了配合AddAssetHtmlPlugin，不能使用template插件。
    //如果要生成多个页面，那么就多次调用此插件。
    new HtmlWebpackPlugin({
      title: 'webpack performance', //生成的页面的title
      filename: 'index.html',       //生成的页面的文件名
      template: './src/index.ejs',  //此页面使用的模板。ejs格式无需额外loader。
      inject: true,                 //要注入才会把内容写入html
      minify: {                     //页面压缩，先把空格和空行处理掉
        collapseWhitespace: true,
        preserveLineBreaks: true,
      },
      //还可以通过chunks或者excludechunks来调整注入哪些文件
    }),  
    //使用AddAssetHtmlPlugin插件把动态生成的js文件url插入html中
    //可以多次调用此插件，这样可以控制文件插入的顺序。不过插入html后的顺序正好和此处顺序相反。
    //把所有的动态库插入html页面中。
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, '../dll/!(dll-runtime)*.dll.js'),
      includeSourcemap: false
    }),
    //把动态库的公用运行时脚本插入html页面中，并且在动态库加载之前插入
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, '../dll/dll-runtime*.dll.js'),
      includeSourcemap: false
    }),
    //提取重复的webpack脚手架文件
    new webpack.optimize.CommonsChunkPlugin({ 
      name: 'runtime',      //使用一个entry中没有的名称
      minChunks: Infinity   //通过无限循环确保提取的是所有文件的公共集
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