const conn = require('../configs/database')

module.exports = {
    getCart: async username => {
        return new Promise(resolve => {
            conn.query(`SELECT p.name, p.price, c.quantity FROM cart c LEFT JOIN product p ON c.products = p.id WHERE username = '${username}'`, (err, data) => {
                if (err) throw err;
                resolve([username, data])
            })
        })
    },
    getCart: async username => {
        return new Promise(resolve => {
            conn.query(`SELECT p.name, p.price, c.quantity FROM cart c LEFT JOIN product p ON c.products = p.id WHERE username = '${username}'`, (err, data) => {
                if (err) throw err;
                resolve([username, data])
            })
        })
    }
}