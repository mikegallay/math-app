const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

process.noDeprecation = true;

module.exports = {

  devtool: 'eval',

  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.resolve(__dirname, 'app/index.jsx')
  ],

  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: '[name].js',
    publicPath: '/public/'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
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
        test: /\.json?$/,
        use: {
          loader: 'json-loader'
        }
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer]
            }
          }
        ]
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
