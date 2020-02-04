const router = require('express').Router()
const products = require('./products')
const user = require('./cart')
const login = require('./login')
const auth = require('../models/login')

router.use('/', products)
router.use('/user', user)
router.use('/', login)

module.exports = router