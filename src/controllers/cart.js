const cart = require('../models/cart')

function helper(data){
    const json = {}
    json.status = 'Success'
    json.status_code = 200
    json.username = data[0]
    json.total_items = data[1].reduce((sum, x) => {
        return sum += 1 * x.quantity 
    }, 0)
    json.total_price = data[1].reduce((sum, x) => {
        return sum += x.price * x.quantity 
    }, 0)
    json.item_list = data[1]
    return json
}

module.exports = {
    getCart: (req, res) => {
        const username = req.params.username
        cart.getCart(username)
        .then(resolve => {
            res.json(helper(resolve))
        })
    },
    addCart: (req, res) => {
        const username = req.params.username
        const data = req.body
        cart.addCart(username, data)
        .then(resolve => {
            res.json(helper(resolve))
        })
    },
    reduceCart: (req, res) => {
        const username = req.params.username
        const data = req.body
        cart.reduceCart(username, data)
        .then(resolve => {
            res.json(helper(resolve))
        })
    },
    checkout: (req, res) => {
        const username = req.params.username
        const password = req.body.password
        cart.checkout(username, password)
        .then(resolve => {
            res.json(resolve)
        })
    }
}