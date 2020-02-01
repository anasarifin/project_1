const router = require('express').Router()
const products = require('./products')
const user = require('user')

router.use('/products', products)
router.use('/user', user)

module.exports = router