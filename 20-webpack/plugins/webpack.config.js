const path = require('path');
const MdToHtmlPlugin = require('./plugins/md-to-html/index')
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/app.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename:'app.js'
    },
    plugins: [
        new MdToHtmlPlugin({
            // 找到md文件
            template: path.resolve(__dirname, 'test.md'),
            filename:'test.html'
        })
    ]
}