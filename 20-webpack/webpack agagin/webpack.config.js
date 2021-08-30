const path = require('path')
module.exports = {
    mode: 'development',//两个可选值
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, './dist'),//输出文件存放路径
        filename: 'bundle.js'//输出文件的名称
    }
}