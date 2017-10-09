const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin'); //引入清理插件

const dll_path = 'dll'
module.exports = {
    entry: {
        reacts: ['react', 'react-dom'],
        antd: ['antd/lib/tooltip', 'antd/lib/button']
    },
    output: {
        path: path.resolve(__dirname, dll_path),
        filename: '[name].[chunkhash].dll.js',
        library: '[name]'
    },
    plugins: [
        new CleanWebpackPlugin([dll_path]),  //清理输出目录
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')  //通过环境变量定义生产环境
            }
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname, dll_path, '[name].manifest.json'),
            name: '[name]',
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'reacts',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'dll-runtime',
        }),
    ]
};
