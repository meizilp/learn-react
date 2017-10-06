const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.tsx',
    vendor: ['react', 'react-dom']
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),

      appMountId: 'main',
      lang: 'zh-CN',

      title: 'My react project',
      filename: "index.html",
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf("node_modules") !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
      minChunks: Infinity
    })
  ],

  module: {
    rules: [
      { test: /\.tsx?$/, use: 'awesome-typescript-loader', exclude: /node_modules/ },
      { test: /\.js$/, use: 'source-map-loader', exclude: /node_modules/ }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  }
};