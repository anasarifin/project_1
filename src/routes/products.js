const router = require('express').Router()
const products = require('../controllers/products')

router.get('/', products.getProducts)
router.get('/sort/:sort', products.getProducts)
router.get('/:id', products.getOneProduct)
router.post('/', products.insertProduct)
router.patch('/:id', products.updateProduct)
router.delete('/:id', products.deleteProduct)

module.exports = router