const path = require('path');
const webpack = require('webpack');

const dll_path = 'dll'

module.exports = {
    entry: {
        reacts: ['react', 'react-dom','antd/lib/tooltip'],
        //antd: ['antd/lib/tooltip']
    },
    output: {
        path: path.resolve(__dirname, dll_path),
        filename: '[name].[chunkhash].dll.js',
        library: '[name]'
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, dll_path, '[name].manifest.json'),
            name: '[name]',
        })
    ]
};
