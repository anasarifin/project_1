const router = require('express').Router()
const products = require('../controllers/categories')

router.get('/', products.getCategories)
router.post('/', products.inserCategory)
router.patch('/', products.updatCategory)
router.delete('/', products.deletCategory)

module.exports = router
