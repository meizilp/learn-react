# 学习React（with wabpack、typescript）

## 开发环境

1. **node**:V8.1.2。在<https://nodejs.org>下载。
1. **npm**:V5.4.2。通过`npm i -g npm`升级到最新版本。npm执行中如果遇到权限错误可以通过`npm cache verify`来修复。
1. **vscode**:V1.16.1。在<https://code.visualstudio.com/>下载。

## 初始化

1. 创建node工程：`npm init`。
1. 安装Typescript：`npm i typescript --save-dev`。
1. 创建ts工程：`tsc --init`。编辑`tsconfig.json`，内容如下：
    ```json
    {
      "compilerOptions": {
        "target": "es5",    /*直接ts就输出为es5，免去还要再通过babel转换*/
        "module": "es2015", /*webpack支持import形式的模块，模块仍保留为es2015标准*/
        "jsx": "react",     /*tsx文件直接输出为js文件*/
        "sourceMap": true,  /*便于调试，输出ts和js之间的映射关系*/
        "strict": true      /*变量等严格检测*/
      }
    }
    ```
1. 安装react库：`npm i react react-dom`。
1. 安装react头文件：`npm i @types/react @types/react-dom --save-dev`。

## Webpack工程化

### webpack安装

1. 安装webpack及相关工具：`npm i webpack webpack-merge webpack-dev-server --save-dev`。
    * webpack：可执行命令。
    * webpack-merge：用来合并webpack配置文件的工具包。
    * webpack-dev-server：便于调试代码的工具。
1. 安装webpack加载器：`npm i awesome-typescript-loader source-map-loader`。
    * awesome-typescript-loader：用于处理typescript源代码，编译成webpack可以处理的js文件。
    * source-map-loader：把js的sourcemap合并到最终webpack生成的sourcemap中。  
        TS代码 --tsc--> 中间JS代码和sourcemap1 --webpack--> 最终JS代码和sourcemap2。如果不使用这个loader，那么sourcemap1的信息就会丢失，在浏览器中调试时就无法回溯到最初的TS代码，只能到中间的JS代码为止了。
1. 安装webpack插件：`npm i clean-webpack-plugin html-webpack-plugin html-webpack-template uglifyjs-webpack-plugin --save-dev`
    * clean-webpack-plugin:用来清理输出目录的插件，保证输出目录里面没有垃圾文件。
    * html-webpack-plugin:用来生成html页面。因为脚本的名称在不停的变，所以需要插件来动态生成html页面。
    * html-webpack-template：配合html-webpack-plugin使用，来简化页面的配置。
    * uglify-webpack-plugin：生产环境来移除无用的代码。 

### webpack配置

webpack支持通过`--config`指定配置文件名称。为了便于生产环境和开发环境不同配置，分别用不用的文件名称来编写，二者共同的配置再单独保存在一个文件中供引用。

1. webpack.config/webpack.common.js 共同配置
    ```js
    const webpack = require('webpack'); //引入webpack，以使用内置插件
    const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入生成页面插件

    const index_html_options = {  //生成index.html的配置
      inject: false,
      template: require('html-webpack-template'),   //生成页面时通过template生成

      appMountId: 'main',   //在页面中生成一个id为main的div
      lang: 'zh-CN',    //指定页面语言

      title: 'My react project',  //指定页面title
      filename: "index.html"  //指定输出的html页面文件名
    }

    module.exports = {
      entry: {
        app: './src/index.tsx',   //程序入口文件
        vendor: ['react', 'react-dom']  //引用的第三方库
      },
      plugins: [
        new HtmlWebpackPlugin(index_html_options),  //生成index.html
        new webpack.optimize.CommonsChunkPlugin({ //提取重复的第三方库
          name: 'vendor', //在entry中对应的条目名称
          minChunks: function (module) {
            return module.context && module.context.indexOf("node_modules") !== -1;
          }
        }),
        new webpack.optimize.CommonsChunkPlugin({ //提取重复的webpack脚手架文件
          name: 'runtime',  //使用一个entry中没有的名称
          minChunks: Infinity
        })
      ],
      module: {
        rules: [  //ts以及tsx文件通过一个loader处理；js文件通过sourcemap转换处理
          { test: /\.tsx?$/, use: 'awesome-typescript-loader', exclude: /node_modules/ },
          { test: /\.js$/, use: 'source-map-loader', exclude: /node_modules/ }
        ]
      },
      resolve: {  //库的解析扩展名增加tsx以及ts类型的文件
        extensions: ['.tsx', '.ts', '.js', '.jsx']
      }
    };
    ```
1. webpack.dev.js 开发环境
    ```js
    const path = require('path');
    const merge = require('webpack-merge'); //引入merge工具
    const common = require('./webpack.config/webpack.common.js'); //引入共同配置

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
      ]
    });
    ```
1. webpack.prod.js 生产环境
    ```js
    const path = require('path');
    const merge = require('webpack-merge'); //引入merge工具
    const common = require('./webpack.config/webpack.common.js'); //引入共同配置
    const CleanWebpackPlugin = require('clean-webpack-plugin'); //引入清理插件

    const UglifyJSPlugin = require('uglifyjs-webpack-plugin');  //引入代码优化插件
    const webpack = require('webpack'); //要使用webpack内置插件，引入webpack对象

    const output_path = './dist/release'  //定义输出目录

    module.exports = merge(common, {
      devtool: 'source-map',    //定义sourcemap类型。
      plugins: [
        new CleanWebpackPlugin([output_path]),  //清理输出目录
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
    ```
1. npm 脚本
    ```json
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "build": "webpack --config webpack.prod.js",  
      "start": "webpack-dev-server --open --port 8080 --config webpack.dev.js"
    },
    ```

## Hello world

1. src/index.tsx
    ```tsx
    /*
     * 要通过import导入，webpack才能建立依赖关系。如果采用全局变量的方式使用React，
     * 那么可以不用import，但是要修改webpack的配置文件，把React配置为external的。
     */
    import * as ReactDOM from 'react-dom'
    import * as React from 'react'

    ReactDOM.render(
        <h1>Hello, world!</h1>, document.getElementById('main')
    )
    ```

1. 开发环境运行：`npm run start`
1. 生产环境编译：`npm run build`

## TSX语法

* 允许HTML和Typescript混写；
* 类型转换要用as操作符；
* 以<开头的作为HTML标签解析，以{开头的作为代码解析(约定)；
* 用双引号来指定**字符串**或者用花括号嵌入**表达式**作为属性值。
