const categories = require('../models/categories.js')


module.exports = {
    getcategories: (req, res) => {
        categories.getcategories()
        .then(result => {
            helper.response(res, result, 200)
        })
    },
    getOneCategory: (req, res) => {
        categories.getOneCategory()
        .then(result => {
            helper.response(res, result, 200)
        })
    },
    insertCategory: (req, res) => {
        categories.insertCategory()
        .then(result => {
            helper.response(res, result, 200)
        })
    },
    updateCategory: (req, res) => {
        categories.updateCategory()
        .then(result => {
            helper.response(res, result, 200)
        })
    },
    deleteCategory: (req, res) => {
        categories.deleteCategory()
        .then(result => {
            helper.response(res, result, 200)
        })
    }
}