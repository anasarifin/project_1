const cart = require('../models/cart')

function helper(data){
    const json = {}
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
        const page = req.params.page
        const sort = req.params.sort
        cart.getCart(username, page, sort)
        .then(resolve => {
            res.json(helper(resolve))
        })
    },
    addCart: (req, res) => {
        console.log(req.username);
        const username = req.username
        const data = req.body
        cart.addCart(username, data)
        .then(() => {
            res.redirect(301, '/user/' + username)
        })
    },
    reduceCart: (req, res) => {
        const username = req.username
        const data = req.body
        cart.reduceCart(username, data)
        .then(() => {
            res.redirect(301, '/user/' + username)
        })
    },
    checkout: (req, res) => {
        const username = req.username
        const password = req.body.password
        cart.getCart(username).then(resolve => {
            resolve[1].forEach(x => {
                delete x.updated_at
            });
            delete resolve[1].update_at
            const payment = {status: 'Purchased success', purchased_date: new Date().toISOString(), ...helper(resolve)}
            cart.checkout(username, password)
            .then(() => {
                res.json(payment)
            })
        })
    }
}