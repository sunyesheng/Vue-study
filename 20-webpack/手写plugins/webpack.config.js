const path = require('path')
const MdToHtmlPlugin = require('./plugins/md-to-html')
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/app.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename:'app.js'
    },
    plugins: [
        new MdToHtmlPlugin({
            template: path.resolve(__dirname, 'text.md'),
            filename:'text.html'
        })
    ]
}