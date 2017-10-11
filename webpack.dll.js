const path = require('path');
const webpack = require('webpack');

//引入清理插件，每次构建时清理输出目录。
const CleanWebpackPlugin = require('clean-webpack-plugin'); 

//输出目录
const dll_path = 'dll'

//当需要增加库的时候，只要在entry中增加条目即可。
module.exports = {
    entry: {
        reacts: ['react', 'react-dom'],                 //react库
        antd: ['antd/lib/tooltip', 'antd/lib/button']   //antd库
    },
    output: {
        path: path.resolve(__dirname, dll_path),    //输出到当前目录/dll
        filename: '[name].[chunkhash].dll.js',      //使用chunkhash将文件名和文件内容关联
        library: '[name]_[chunkhash]'       //库的名称，引入hash值主要避免库名称冲突
    },
    plugins: [
        new CleanWebpackPlugin([dll_path]),     //清理输出目录
        new webpack.HashedModuleIdsPlugin(),    //确保模块id不变，避免影响chunkhash值的计算
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')  //通过环境变量定义生产环境
            }
        }),
        new webpack.DllPlugin({     //动态库配置
            path: path.join(__dirname, dll_path, '[name].manifest.json'),
            name: '[name]_[chunkhash]',         //动态库的名称，要和output中的一致
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,       //优化输出
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'reacts',         //把reacts库提出来，避免重复加载reacts
            minChunks: Infinity 
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'dll-runtime',    //把webpack脚手架代码提出来，保证文件内容不变则chunkhash不变
            minChunks: Infinity 
        }),
    ]
};
