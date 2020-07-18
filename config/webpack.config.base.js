const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('./app.config.json');
const path = require('path');

module.exports = {
  entry: path.resolve(process.cwd(), 'src', 'index'),
  // entry: {
  //   app: path.resolve(process.cwd(), 'src', 'app'),
  //   PAGE_2: path.resolve(process.cwd(), 'src', 'PAGE_2'),
  // },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      // {
      //   test: /\.html/,
      //   use: ['html-loader'],
      // },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
      {
        test: /\.ejs$/,
        use: {
          loader: 'ejs-compiled-loader',
          options: {
            htmlmin: false,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        CLIENT_ROUTE: JSON.stringify('no'),
      },
    }),
    new HtmlWebpackPlugin({
      hash: true,
      // filename: 'index.html', //Un-comment if MPA
      template: path.resolve(process.cwd(), 'src', 'views', 'index.ejs'),
      templateParameters: {
        TITLE: config.title,
      },
      // chunks: ['vendor', 'app'], //Un-comment if MPA
    }),
    // new HtmlWebpackPlugin({
    //   hash: true,
    //   filename: 'PAGE_2.html',
    //   title: 'PAGE 2',
    //   template: path.resolve(process.cwd(), 'src', 'views', 'PAGE_2.html'),
    //   chunks: ['vendor', 'PAGE_2_BUNDLE'],
    // }), //Un-comment if MPA
  ],
};
