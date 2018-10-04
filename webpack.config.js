const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const CSSLoader = {
  test: /\.css$/,
  use: [
    (devMode ? 'style-loader' : MiniCssExtractPlugin.loader),
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
      },
    },
    'postcss-loader',
  ],
};

const HTMLLoader = {
  test: /\.html$/,
  use: {
    loader: 'html-loader',
    options: {
      minimize: false,
    },
  },
};

const FileLoader = {
  test: /\.(png|svg|jpg|gif)$/,
  use: ['file-loader'],
};

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: './src/js/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9090,
    hot: true,
  },
  module: {
    rules: [
      HTMLLoader,
      CSSLoader,
      FileLoader,
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      chunkFilename: '[id].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
