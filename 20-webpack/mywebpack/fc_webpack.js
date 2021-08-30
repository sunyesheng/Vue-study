const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core')


let ID = 0;
// 读取并且整理文件
function creatAsset (filename) {
    // 读取文件内容成功
    const content = fs.readFileSync(filename, 'utf8')
    
    // 通过parser.parse生成ast语法树
    const ast = parser.parse(content, {
        sourceType: 'module'
    });

    // 依赖项可能有多项  可以用一个数组来存储
    const dependencies = []

    // 第一个参数是ast语法树 第二个参数 visitor访问者
    // 进入对应的结点 会进行相应的回调函数
    traverse(ast, {
        // 结点类型 回调函数 node是结点信息
        // 从之中可以获得他的依赖项
        ImportDeclaration: ({node}) => {
            dependencies.push(node.source.value)
        }
    })

    // 将es6转换为es5
    const {code} = babel.transformFromAstSync(ast, null,{
        // 使用哪些插件
        // 套餐
        presets: ['@babel/preset-env'],
        // 单点
        //plugins:[]
    })
    let id = ID++
    return {
        filename,
        code,
        dependencies,
        id
    }
}

// 构建文件依赖图
function createGraph (entry) {
    // 读取并且整理文件 返回值为对象
    const mainAsset = creatAsset(entry)

    // 队列循环的方式 将对象添加到数组中
    const queue = [mainAsset];

    // 循环遍历 添加依赖mapping 和依赖的id
    for (const asset of queue) {
        // 路径处理
        const dirname = path.dirname(asset.filename)

        asset.mapping = {}
        // 相对路径可能存在问题 转换为绝对路径 进行读取
        asset.dependencies.forEach((relativePath) => {

            const absolutePaht = path.join(dirname, relativePath)

            const child = creatAsset(absolutePaht)

            asset.mapping[relativePath] = child.id

            queue.push(child)
        })
    }
    return queue
}

// 实现cmd API整合 打包 返回字符串
function bundle (graph) {
    let modules = '';
    graph.forEach((mod) => {
        modules += `${mod.id}:[function (require,module,exports){
            ${mod.code}
        },
        ${JSON.stringify(mod.mapping)}
    ],`
    } )

    // 立即调用表达式 IIFE
    const result = `
        (function(modules) {
            function require(id){
                const [fn,mapping] = modules[id];
                function localRequire(relativePath){
                    return require(mapping[relativePath]);
                };
                const module = {
                    exports:{}
                }
                fn(localRequire,module,module.exports);
                return module.exports;
            };
            require(0);
        })({${modules}})
    `;
    return result
}

// 输出文件到指定目录
function getDist (bundle) {
    fs.mkdir('./dist', (err) => {
    })
    fs.writeFileSync('./dist/bundle.js', bundle, (err) => {
    })
}

const graph = createGraph('./src/index.js')
const result = bundle(graph)
getDist(result);