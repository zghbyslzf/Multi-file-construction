const path = require('path')
const webpack = require('webpack')
const newConfig = require('./webpack.entry')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const common = {
  // 入口配置
  entry: newConfig.addEntry(),

  // 打包输出配置
  output: {
    filename: '[name]/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },

  // 配置路径解析
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // 这里使用 path.resolve 和 __dirname 来获取绝对路径
    },
    modules: ['node_modules'],
    // 自动路径补全
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.scss']
  },
  stats: { children: false },
  // 定义模块规则
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')('last 100 versions')]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass')
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            // 配置图片输出目录
            options: {
              limit: 10000,
              // [name] 名字, [hash:6]添加6个hash值，[ext]后缀名
              name: 'images/[name]-[hash:6].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            // 配置字体输出目录
            options: {
              name: 'fonts/[name]-[hash:6].[ext]'
            }
          }
        ]
      },
      {
        test: /\.m?js$/,
        // 不在指定目录执行babel-loader，提升运行、打包速度
        exclude: /(node_modules|bower_components)/,
        // 在指定目录下执行babel-loader
        // include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  // 插件选项
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    new MiniCssExtractPlugin({
      // 类似 webpackOptions.output里面的配置 可以忽略
      filename: '[name]/[name].css'
    })
  ]
}

// 动态更新plugins里的 HtmlWebpackPlugin 插件
newConfig.getEntry().forEach(pathname => {
  let conf = {
    // 配置到dist文件夹下面，文件结构和src下面的一致
    filename: path.resolve(
      __dirname,
      `dist/${pathname.replace('src/', '')}/${pathname.replace(
        'src/',
        ''
      )}.html`
    ),
    template: path.join(__dirname, 'src', pathname, 'index.html'),
    chunks: Array.call([], pathname)
  }

  common.plugins.push(new HtmlWebpackPlugin(conf))
})

module.exports = common
