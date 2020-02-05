const express = require('express')
const bodyParser = require('body-parser')
const nocache = require('nocache')
const app = express()
const router = require('./src/routes/index.js')
require('dotenv').config()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/src'))
app.use('/', router)
app.use(nocache())

app.listen(9999, () => {
    console.log(`\n Server started on port ${process.env.SERVER_PORT} ...\n`)
})