const path = require('path')
const glob = require('glob')

class config {
  static getEntry() {
    let globPath = 'src/**/*.html'
    // (\/|\\\\) 这种写法是为了兼容 windows和 mac系统目录路径的不同写法
    let pathDir = 'src(/|\\\\)(.*?)(/|\\\\)'
    let files = glob.sync(globPath)
    let dirname,
      entries = []
    for (let i = 0; i < files.length; i++) {
      dirname = path.dirname(files[i])
      entries.push(
        dirname.replace(new RegExp('^' + pathDir), '$2').replace('src/', '')
      )
    }
    return entries
  }

  static addEntry() {
    let entryObj = {}
    this.getEntry().forEach(item => {
      entryObj[item] = [
        '@babel/polyfill',
        path.resolve(__dirname, 'src', item, 'index.js')
      ]
    })
    return entryObj
  }
}

module.exports = config
