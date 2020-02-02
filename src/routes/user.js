const router = require('express').Router()
const user = require('../controllers/user')

router.get('/:username/cart', user.cart)
router.get('/:username/history', user.history)
// router.get('/:id', user.getOneProduct)
// router.post('/', user.insertProduct)
// router.patch('/:id', user.updateProduct)
// router.delete('/:id', user.deleteProduct)

module.exports = router