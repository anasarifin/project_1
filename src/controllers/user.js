const user = require('../models/user')

function helper(data){
    const json = {}
    json.status = 'Success'
    json.status_code = 200
    json.total_products = data.length
    json.total_price = data.filter(x => x != null)
    .reduce((sum, x) => {return sum += x.price}, 0)
    json.data = data
    return json
}

module.exports = {
    cart: (req, res) => {
        const username = req.params.username
        user.cart(username)
        .then(resolve => {
            console.log(resolve)
            res.json(helper(resolve))
        })
    },
    history: (req, res) => {
        const username = req.params.username
        user.history(username)
        .then(resolve => {
            res.json(helper(resolve))
        })
    },
}