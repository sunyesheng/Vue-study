function tplReplace (template, replaceObj) {
    return template.replace(/\{\{(.*?)\}\}/g, (node, key) => {
        return replaceObj[key]
    })
}
module.exports = {
    tplReplace
}