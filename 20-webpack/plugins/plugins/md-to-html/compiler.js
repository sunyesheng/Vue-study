// 匹配开头
const reg_mark = /^(.+?)\s/
const reg_sharp = /^\#/

// 定义一个方法 将数组形式的md字符串转换树状结构
function createTree (_mdArr) {
    let _htmlPool = {};
    // 上一次的标签 通过和上一次的标签进行对比 判断是否更换标签
    let _lastMark = '';
    _mdArr.forEach((mdFragment) => {
        // 将每一项遍历 进行首字符的分割
        const matched = mdFragment.match(reg_mark);
        
        // 匹配#号开头的 字符
        if (matched) {
            const mark = matched[1]
            // [ '# ', '#', index: 0, input: '# 这是一个h1标签\r', groups: undefined ]
            // 拿到其中的input
            const input = matched['input'];
            if (reg_sharp.test(mark)) {
                // 拿到几个#号 来判断是h1 h2 h3
                const tag = `h${mark.length}`;
                // 将#号 替换为空 保存成纯文本的一个字符串内容
                const tagContent = input.replace(reg_mark, '').replace('\r','')
                // 再次判断 是否跟上一次的标签相同
                if (_lastMark === mark) {
                    // 如果是两行#号的话 直接合并即可
                    _htmlPool[tag].tags = [...htmlPool[tag].tags,`<${tag}>${tagContent}</${tag}>`]
                } else {
                    // 当前的mark 替换上一次的mark
                    _lastMark = mark;
                    _htmlPool[tag] = {
                        // #属于单标签
                        type: 'single',
                        tags:[`<${tag}>${tagContent}</${tag}>`]
                    }
                }
            }
        }
    })
    return _htmlPool
}

function compileHTML(_mdArr) {
    const _htmlPool = createTree(_mdArr)
    let _htmlStr = '';
    let item;
    for (let k in _htmlPool) {
      item = _htmlPool[k];
      if (item.type === 'single') {
        item.tags.forEach(tag => {
          _htmlStr += tag;
        });
      } else if (item.type === 'wrap') {
        let _list = `<${k.split('-')[0]}>`;
        item.tags.forEach(tag => {
          _list += tag;
        })
        _list += `</${k.split('-')[0]}>`;
        _htmlStr += _list
      }
    }
    return _htmlStr;
  }


module.exports = {
    compileHTML
}





// // 核心 将md 转换为 html 标签
// function compileHTML (_mdArr) {
    
//     const _htmlPool = createTree(_mdArr)

//     return _htmlPool

// }
/**
 * 将其解析成一个对象 
 * {
 *  h1：{
 *      type：有没有外层的标签 例如ul li ''single
 *      tags:[<h1>这是一个h1的标题</h1>]
 *      }
 *  ul-随机字符串：{
 *      type：’wrap‘
 *      tags：[
 *          <li></li>......
 * ]
 * 
 * }
 * 
 * }
 */