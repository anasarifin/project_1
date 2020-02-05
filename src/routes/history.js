const router = require('express').Router()
const history = require('../controllers/history')

router.get('/', history.getHistory)

module.exports = router
