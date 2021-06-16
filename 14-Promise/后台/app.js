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

app.listen(80, () => {
    console.log('ok');
})