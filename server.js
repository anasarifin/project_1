const express = require('express')
const bodyParser = require('body-parser')
const nocache = require('nocache')
const app = express()
const router = require('./src/routes/index.js')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/src'))
app.use('/', router)
app.use(nocache())

app.listen(9999, () => {
    console.log(9999)
})