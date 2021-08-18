const arr = '<div></div><p></p><a>1231</a>'
let a = arr.replace(/\<(.*?)\>/g, (value, index) => {
    console.log(value);//<div>
    console.log(index);//div
    return '替换的信息'
})