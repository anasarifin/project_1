const router = require('express').Router()
const products = require('../controllers/categories')

router.get('/', products.getCategories)
// router.get('/wew/:id', products.getOneCategory)
// router.get('/:type/:id', products.getOneCategory)
router.post('/', products.inserCategory)
router.patch('/', products.updatCategory)
router.delete('/', products.deletCategory)

module.exports = router
