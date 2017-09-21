# learn-react

学习React

## Hello world

### 开发环境

1. 安装`node`，版本**6.3.1**。单独执行`npm install -g npm`升级`npm`到版本**5.4.1**。
1. 安装`typescript`，版本**2.5.2**。
1. 安装`vscode`，版本**1.16**。

### 创建工程

1. `npm init`创建`package.json`。
1. `tsc --init`创建`tsconfig.json`。
1. 编辑`tsconfig.json`。打开jsx选项并修改值为'react'以便将tsx文件直接输出为js文件。
1. `npm install react react-dom --save`安装react、react-dom包。
1. `npm install @types/react @types/react-dom --save-dev`安装react、react-dom头文件。

### 代码实现

1. 创建`mainpage.tsx`。用全局对象的方式使用react，所以不需要import任何对象。
    ```jsx
    ReactDOM.render(
        <h1>Hello, world!</h1>, document.getElementById('root')
    )
    ```
1. 创建index.html。
    * head加入对react代码的引用；
    * body加入一个div，id为tsx文件中指定的名称；
    * body加入对编译后js文件的引用
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <script src="node_modules/react/dist/react.js"></script>    
        <script src="node_modules/react-dom/dist/react-dom.js"></script>
    </head>
    <body>
       <div id="root">Root DIV</div>
       <script src="mainpage.js"></script>
    </body>
    </html>
    ```

### 编译执行

1. 在项目根目录执行`tsc`；
1. 用浏览器打开`index.html`，就可以看到页面内容了。

## TSX语法

允许HTML和Typescript混写；类型转换要用as操作符；以<开头的作为HTML标签解析，以{开头的作为代码解析(约定)。

## 深入

[组件](component.md)