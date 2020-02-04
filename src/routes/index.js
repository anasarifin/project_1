const router = require('express').Router()
const products = require('./products')
const user = require('./cart')
const login = require('../controllers/login')
const auth = require('../models/login')

router.use('/', products)
router.use('/user', user)
router.post('/login', login.create)

module.exports = router