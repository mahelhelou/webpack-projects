import _ from 'lodash'

const element = document.createElement('h1')
element.innerHTML = _.join(['Hello', 'Webpack 5!'], ' ')

document.body.appendChild(element)
