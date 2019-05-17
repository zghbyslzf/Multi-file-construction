const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(common, {
  // 处于生产环境
  mode: 'production',
  devtool: 'source-map',

  // 压缩js、css资源、分包
  optimization: {
    runtimeChunk: 'single',

    minimizer: [
      // 压缩js、压缩css配置
      new UglifyJsPlugin({
        sourceMap: false,
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin()
    ],

    // 分包，把node_modules作为公共部分
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },

  // 插件选项
  plugins: [
    // 清除上次构建的文件，清除目录是基于output出口目录
    new CleanWebpackPlugin()
  ]
})
