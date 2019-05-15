// import _ from 'lodash'
// import './style.css'
// import printMe from './print.js'
import { cube } from './math.js'

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
}

function component() {
  //   let element = document.createElement('div')
  //   var btn = document.createElement('button')
  var element = document.createElement('pre')

  //   element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  //   element.classList.add('hello')

  //   btn.innerHTML = '点击这里，然后查看 console！'
  //   btn.onclick = printMe

  element.innerHTML = ['Hello webpack!', '5 cubed is equal to ' + cube(5)].join(
    '\n\n'
  )

  //   element.appendChild(btn)

  return element
}

document.body.appendChild(component())

// let element = component() // 存储 element，以在 print.js 修改时重新渲染
// document.body.appendChild(element)

// if (module.hot) {
//   module.hot.accept('./print.js', function() {
//     console.log('Accepting the updated printMe module!')
//     document.body.removeChild(element)
//     element = component() // Re-render the "component" to update the click handler
//     element = component() // 重新渲染 "component"，以便更新 click 事件处理函数
//     document.body.appendChild(element)
//   })
// }
