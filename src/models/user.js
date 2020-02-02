const conn = require('../configs/database')

function cartSource(username) {
    return new Promise(resolve => {
        conn.query(`SELECT cart FROM user WHERE username = '${username}'`, (err, data) => {
            if (err) throw err;
            resolve(data[0].cart.split('.').map(x => parseFloat(x)))
        })
    })
}
function cartLoop(x) {
    return new Promise(resolve => {
        conn.query(`SELECT * FROM product WHERE id = ${x}`, (err, data) => {
            if (err) throw err;
            resolve(data[0])
        })
    })




    // let final = []
    // for (let x = 0; x < userCart.length; x++) {
        
    // }
    // return new Promise(resolve => {
    //     resolve(final)
    // })
}

function historySource(username) {
    return new Promise(resolve => {
        conn.query(`SELECT history FROM user WHERE username = '${username}'`, (err, data) => {
            if (err) throw err;
            resolve(data[0].history.split('.'))
        })
    })
}

module.exports = {
    cart: async username => {
        const final = []
        const userCart = await cartSource(username)
        console.log(userCart)
        for (x = 0; x < userCart.length; x++) {
            final.push(await cartLoop(userCart[x]))
        }
        return new Promise(resolve => {
            console.log(final)
            resolve(final)
        })
    },
    history: async username => {
        const userHistory = await historySource(username)
        const final = []
        return new Promise(resolve => {
            resolve(final)
        })
    }
}