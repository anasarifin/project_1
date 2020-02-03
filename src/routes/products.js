const router = require('express').Router()
const products = require('../controllers/products')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/img")
    },
    filename: function(req, file, callback){
        callback(null, file.originalname)
    }
})
const upload = multer({storage})

router.get('/', products.getProducts)
router.get('/sort/:sort', products.getProducts)
router.get('/:id', products.getOneProduct)
router.post('/', upload.single('image'), products.insertProduct)
router.patch('/:id', upload.single('image'), products.updateProduct)
router.delete('/:id', products.deleteProduct)

module.exports = router