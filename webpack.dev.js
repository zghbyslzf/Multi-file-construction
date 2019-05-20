const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
  // 处于开发环境
  mode: 'development',
  devtool: 'inline-source-map',
  //  开启热更新
  devServer: {
    contentBase: './dist'
  },

  // 插件选项
  plugins: [
    // 热替换插件
    new webpack.HashedModuleIdsPlugin(),
    // 在热加载时直接返回更新文件名，而不是文件的id。
    new webpack.NamedModulesPlugin()
  ]
})
