const router = require('express').Router()
const products = require('./products')
const user = require('./cart')

router.use('/products', products)
router.use('/user', user)

module.exports = router