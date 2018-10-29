const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminJpegRecompress = require('imagemin-jpeg-recompress');

module.exports = {

  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    path.join(__dirname, 'app/index.jsx')
  ],

  output: {
    path: path.join(__dirname, 'public/build'),
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new ImageminPlugin({
      test: /\.(png|jpe?g|gif|svg|ico)$/,
      pngquant: {
        quality: '65-80'
      },
      plugins: [
        ImageminJpegRecompress({
          max: 75
        })
      ]
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            'sass-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer]
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        exclude: /fonts/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff2?)$/,
        exclude: /images/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.(mp3|wav|ogg|flac)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'audio/[name].[ext]'
          }
        }
      },
      {
        test: /\.(mp4|avi|ogv|webm)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'video/[name].[ext]'
          }
        }
      }
    ]
  }

};
