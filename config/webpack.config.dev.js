const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const webpackMerge = require('webpack-merge');
const path = require('path');

module.exports = webpackMerge.smart(baseConfig, {
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    port: 8080,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
});
