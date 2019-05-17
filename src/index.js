import '@/style'
function component() {
  var element = document.createElement('div')

  element.innerHTML = _.join(['Hello 哈哈', 'webpack 我'], ' ')
  element.classList.add('hello')

  return element
}

document.body.appendChild(component())
