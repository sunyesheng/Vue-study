const { readFileSync } = require('fs')
const { resolve } = require('path')
const { compileHTML } = require('./compiler')

// 需要替换的字符串
const INNERMARK = '<!-- inner -->'

class MdToHtmlPlugin {
    constructor({ template, filename }) {
        if (!template) {
            throw new Error("template must exit")
        }
        this.template = template;
        this.filename = filename ? filename : 'md.html'
    }

    apply (compiler) {
        compiler.hooks.emit.tap('md-to-html-plugin', (compliation) => {
            const _assets = compliation.assets;

            // 读取md文件
            const _mdContent = readFileSync(this.template, 'utf8');
            // 读取template文件
            const _templateHTML = readFileSync(resolve(__dirname, 'template.html'), 'utf8')
            // 按照行将其分割成数组
            const _mdContentArr = _mdContent.split('\n')

            // 构造一个方法 将md文件转换为html标签
            const _htmlStr = compileHTML(_mdContentArr)


            // 替换
            const _finaHTML = _templateHTML.replace(INNERMARK, _htmlStr);


             _assets[this.filename] = {
                 source () {
                     return _finaHTML
                 },
                 size () {
                    return _finaHTML.length;
                 }
             }
        })
    }
}

module.exports = MdToHtmlPlugin