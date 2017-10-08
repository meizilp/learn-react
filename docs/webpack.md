# Webpack 打包

## CommonsChunkPlugin用法

建立独立文件，这个文件包含指定chunk的的公共chunk；并移除指定chunk中的公共代码，改为引用。  

1. `option.chunks`:  
    * 不设置(默认值)：针对所有入口条目都会处理。
    * 设置(数组)：只处理数组中指明的入口条目。
1. `option.name`:  
    * name选中的是**已存在的chunk**，那么从option.chunks中提取此chunk出来。
    * name选中的是**不存在的chunk**，那么从option.chunks中提取公共chunk出来，并以name来命名此chunk，这样其他插件就可以处理新生成的chunk了。
    * 如果是个数组，数组中的每个元素按照同样逻辑处理一遍。

## 利用Dll插件提高打包性能

一共分为两步：

1. 打包生成dll包
1. 引用dll包，生成业务代码

### 生成dll包

touch dll.webpack.config.js

### 引用dll包