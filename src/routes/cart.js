const router = require('express').Router()
const cart = require('../controllers/cart')

router.get('/:username', cart.getCart)
router.get('/:username/:page', cart.getCart)
router.patch('/:username', cart.addCart)
router.delete('/:username', cart.reduceCart)
router.post('/:username', cart.checkout)

module.exports = router