const { module } = require('./webpack.config.dev');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

module.exports = webpackMerge.smart(baseConfig, {
  output: {
    publicPath: './',
    filename: '[contenthash].js',
    chunkFilename: '[contenthash].js',
  },
  devtool: 'eval-cheap-source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: 'postcss.config.js' } },
          },
          'sass-loader',
        ],
        sideEffects: true,
      },
      {
        test: /\.css$/,
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: 'postcss.config.js' } },
          },
          'css-loader',
        ],
        sideEffects: true,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/images/[hash:base64].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCSSExtractPlugin(),
    new OptimizeCssAssetsPlugin(),
    new BundleAnalyzerPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
});
