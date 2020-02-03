const router = require('express').Router()
const user = require('../controllers/user')

router.get('/:username', user.getCart)
router.patch('/:username', user.addCart)


module.exports = router