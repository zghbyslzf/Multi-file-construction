const path = require('path')
const webpack = require('webpack')
const newConfig = require('./webpack.entry')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = {
  // 入口配置
  entry: newConfig.addEntry(),

  // entry: {
  //   app: ['@babel/polyfill', resolve('./src/index.js')]
  // },

  // 插件选项
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash'
    })
  ],

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

  // 定义模块规则
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass')
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: /\.m?js$/,
        // 指定目录去加载babel-loader，提升运行、打包速度
        exclude: /(node_modules|bower_components)/,
        // include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
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
