const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/app.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename:'app.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tpl$/,
                use: [
                    'babel-loader',
                    './loader/tpl-loader/index.js'
                ]
            }
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'index.html')
        })
    ],
    devServer: {
        port:'8088'
    }
}