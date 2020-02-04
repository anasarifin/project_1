const router = require('express').Router()
const cart = require('../controllers/cart')
const auth = require('../configs/auth.js')

router.get('/:username', cart.getCart)
router.get('/:username/:page', cart.getCart)
router.get('/:username/sort/:sort', cart.getCart)
router.patch('/', auth, cart.addCart)
router.delete('/', auth, cart.reduceCart)
router.post('/', auth, cart.checkout)

module.exports = router