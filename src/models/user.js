const conn = require('../configs/database')

function getQuantity(x) {
    return new Promise(resolve => {
        conn.query(`SELECT quantity FROM cart WHERE product_id = '${x}'`, (err, data) => {
            if (err) throw err;
            resolve(data[0])
        })
    })
}

module.exports = {
    getCart: username => {
        return new Promise(resolve => {
            conn.query(`SELECT c.quantity, p.name, p.price, p.description FROM cart c LEFT JOIN product p ON c.product_id = p.id WHERE username = '${username}'`, (err, data) => {
                if (err) throw err;
                resolve([username, data])
            })
        })
    },
    addCart: async (username, data) => {
        for (const x in data) {
            const qty = await getQuantity(x)
            if (qty == undefined) {
                conn.query(`INSERT INTO cart (username, product_id, quantity) VALUES ('${username}', '${x}', '${data[x]}')`, err => {
                    if (err) throw err;
                })
            } else {
                conn.query(`UPDATE cart SET quantity = '${parseFloat(qty.quantity) + parseFloat(data[x])}' WHERE username = '${username}' AND product_id = '${x}'`, err => {
                    if (err) throw err;
                })
            }
        }
        return new Promise(resolve => {
            conn.query(`SELECT c.quantity, p.name, p.price, p.description FROM cart c LEFT JOIN product p ON c.product_id = p.id WHERE username = '${username}'`, (err, data) => {
                if (err) throw err;
                resolve([username, data])
            })
        })
    },
    reduceCart: async (username, data) => {
        for (const x in data) {
            const qty = await getQuantity(x)
            if (qty != undefined) {
                if (qty.quantity - data[x] <= 0) {
                    conn.query(`DELETE FROM cart WHERE product_id = '${x}'`, err => {
                        if (err) throw err;
                    })
                } else {
                    conn.query(`UPDATE cart SET quantity = '${parseFloat(qty.quantity) - parseFloat(data[x])}' WHERE username = '${username}' AND product_id = '${x}'`, err => {
                        if (err) throw err;
                    })
                }
            }
        }
        return new Promise(resolve => {
            conn.query(`SELECT c.quantity, p.name, p.price, p.description FROM cart c LEFT JOIN product p ON c.product_id = p.id WHERE username = '${username}'`, (err, data) => {
                if (err) throw err;
                resolve([username, data])
            })
        })
    }
}