const { tplReplace } = require('../utils.js')

// loader 就是一个函数
const tplLoader = function (source) {

    source = source.replace(/\s+/g, '');
    // 最终返回的是一个字符串 函数字符串
    return `
        export default (options) => {
            ${tplReplace.toString()}
            return tplReplace('${source}',options)
        }
    `
}

module.exports = tplLoader