/*
    mode development production 
    entry 入口文件
    output path filename 打包输出路径
    devtool source-map
    module rules 配置loader
    plugins 配置插件
    devServer 开发服务器
*/
const { resolve } = require("path")
module.exports = {
    mode: "development",
    entry: resolve((__dirname), 'src/app.js'),
    output: {
        path: resolve((__dirname), 'build'),
        filename:'app.js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                text: '/\.tpl$/',
                use: [
                    {
                        loader: 'tpl-loader',
                        options: {
                            log:true
                        }
                    }
                ]
            }
        ]
    }
}