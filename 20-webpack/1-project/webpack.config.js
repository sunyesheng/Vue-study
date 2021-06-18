const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlp = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html'
})

const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    //编译模式
    mode: 'development',//两个可选值
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, './dist'),//输出文件存放路径
        filename: 'hello.js'//输出文件的名称
    },
    plugins: [htmlp, new VueLoaderPlugin()],
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            {
                test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
                use: 'url-loader'//?limit=1027540
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
            }
        ]
    }
}