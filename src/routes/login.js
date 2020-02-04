const router = require('express').Router()
const login = require('../controllers/login')

router.post('/login', login.createToken)
router.post('/register', login.register)

module.exports = router
