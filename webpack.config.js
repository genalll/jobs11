const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';


module.exports = {
  entry: "./src/script.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },

  module: {
    rules: [{ // тут описываются правила
      test: /\.js$/, // регулярное выражение, которое ищет все js файлы
      use: {
        loader: "babel-loader",
        options: {
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      },// весь JS обрабатывается пакетом babel-loader
      exclude: /node_modules/, // исключает папку node_modules

    },
    {
      test: /\.css$/,
      use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
      {
        loader:'css-loader',
        options: {
            importLoaders: 2
        } 
    },
        'postcss-loader'],


    },
    {
      test: /\.(woff|woff2|ttf)$/,
      use: "file-loader"
    },
    {
      test: /\.(gif|png|jpg|jpeg|svg)?$/,
      use: [
        'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
        {
          loader: 'image-webpack-loader',
          options: { name: 'assets/img/[name].[ext]' }
        },
      ]
    }

    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash(),
    new MiniCssExtractPlugin({ filename: 'style.[contenthash].css' }),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true
    })

  ]


}