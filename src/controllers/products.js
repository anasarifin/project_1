const products = require('../models/products.js')

function helper(data){
    const json = {}
    json.status = 'Success'
    json.status_code = 200
    json.total_products = data.length
    json.product_list = data
    return json
}

module.exports = {
    getProducts: (req, res) => {
        const sort = req.params.sort
        products.getProducts(sort)
        .then(result => {
            res.json(helper(result))
        })
    },
    getOneProduct: (req, res) => {
        const id = req.params.id
        products.getOneProduct(id)
        .then(result => {
            res.json(result)
        })
    },
    insertProduct: (req, res) => {
        const {name, description, price, stock, id_category} = req.body
        const data = {
            name: name,
            description: description,
            price: parseFloat(price),
            stock: parseFloat(stock),
            image: 'empty',
            id_category: parseFloat(id_category)
        }
        console.log(data)
        products.insertProduct(data)
        .then(result => {
            res.json(result)
        })
    },
    updateProduct: (req, res) => {
        const id = req.params.id
        const {name, description, price, stock, id_category} = req.body
        const data = {
            name: name,
            description: description,
            price: price,
            stock: stock,
            image: req.file.filename,
            id_category: id_category
        }
        products.updateProduct(id, data)
        .then(result => {
            res.json(result)
        })
    },
    deleteProduct: (req, res) => {
        const id = req.params.id
        products.deleteProduct(id)
        .then(result => {
            res.json(result)
        })
    }
}