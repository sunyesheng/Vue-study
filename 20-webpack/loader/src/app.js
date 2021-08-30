import tpl from './info.tpl'

const oApp = document.querySelector('#app')

const info = {
    name: 'sunyesheng',
    sex:'nan'
}
oApp.innerHTML = tpl(info)