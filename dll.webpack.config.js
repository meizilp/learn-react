const path = require('path');
const webpack = require('webpack');

const dll_path = 'dll'
module.exports = {
    entry: {
        reacts: ['react', 'react-dom'],
        antd: ['antd/lib/tooltip']
    },
    output: {
        path: path.resolve(__dirname, dll_path),
        filename: '[name].[chunkhash].dll.js',
        library: '[name]'
    },
    devtool: 'source-map',
    plugins: [
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
            sourceMap: true,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'reacts',
        }),
    ]
};
