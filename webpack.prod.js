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
        // 可以是布尔值或字符串，如果是字符串既是缓存文件存放的路径
        cache: true,
        // 启用多线程并提高编译速度
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin()
    ],

    // 分包，把node_modules作为公共部分
    splitChunks: {
      cacheGroups: {
        vendor: {
          // 匹配，只提取node_modules部分， '/\.css$/'只提取公共css
          test: /[\\/]node_modules[\\/]/,
          // 提取出来的文件命名
          name: 'vendors',
          // all 提取所有文件的公共部分，initial 提取入口文件的公共css及js部分
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
