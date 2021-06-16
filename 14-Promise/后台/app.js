const express = require('express')

const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "PUT,GET,POST,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header("Accexx-Control-Allow-Headers", "Content-Type")
    next()
})

app.get('/data', (req, res) => {
    console.log(req.query);
    res.send('hello world')
})

app.get('/data1', (req, res) => {
    console.log(req.query);
    res.send('hello world1')
})
app.get('/data2', (req, res) => {
    console.log(req.query);
    res.send('hello world2')
})

/**
 * fetch
 */
app.get('/book', (req, res) => {
    console.log('fetch的get参数传递(传统的URL传参)' + req.query.id);
})
app.get('/book1/:id', (req, res) => {
    console.log('fetch的get参数传递(restful形式传参)' + req.params.id);
})
app.post('/book2', (req, res) => {
    console.log('POST请求的参数' + req.body.pwd);
})


/**
 * json
 */
app.get('/json', (req, res) => {
    res.json({
        uname: '孙业盛',
        age: 15
    })
})





app.listen(80, () => {
    console.log('ok');
})