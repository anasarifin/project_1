const conn = require('../configs/database')

function getQuantity(x) {
    return new Promise(resolve => {
        conn.query(`SELECT quantity FROM cart WHERE product_id = '${x}'`, (err, data) => {
            if (err) throw err;
            resolve(data[0])
        })
    })
}
function checkExist(x) {
    return new Promise(resolve => {
        conn.query(`SELECT id FROM product WHERE id = '${x}'`, (err, data) => {
            if (err) throw err;
            console.log(data)
            resolve(data[0])
        })
    })
}
function getCartList(username) {
    return new Promise(resolve => {
        conn.query(`SELECT product_id, quantity FROM cart WHERE username = '${username}'`, (err, data) => {
            if (err) throw err;
            resolve(data[0])
        })
    })
}
function getHistoryList(username, x) {
    return new Promise(resolve => {
        conn.query(`SELECT * FROM history WHERE username = '${username}' AND product_id = '${x}'`, (err, data) => {
            if (err) throw err;
            resolve(data[0])
        })
    })
}



module.exports = {
    getCart: username => {
        return new Promise(resolve => {
            conn.query(`SELECT c.quantity, p.id AS product_id, p.name, p.price, p.category_id, p.description, c.updated_at FROM cart c LEFT JOIN product p ON c.product_id = p.id WHERE username = '${username}'`, (err, data) => {
                if (err) throw err;
                resolve([username, data])
            })
        })
    },
    addCart: async (username, data) => {
        for (const x in data) {
            const id = await checkExist(x).id
            const qty = await getQuantity(x)
            if (id) {
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
        }
        return new Promise(resolve => {
            conn.query(`SELECT c.quantity, p.id AS product_id, p.name, p.price, t.genre, p.description, c.updated_at FROM cart c LEFT JOIN product p ON c.product_id = p.id LEFT JOIN category t ON p.category_id = t.genre WHERE username = '${username}'`, (err, data) => {
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
            conn.query(`SELECT c.quantity, p.id AS product_id, p.name, p.price, t.genre, p.description, c.updated_at FROM cart c LEFT JOIN product p ON c.product_id = p.id LEFT JOIN category t ON p.category_id = t.genre WHERE username = '${username}'`, (err, data) => {
                if (err) throw err;
                resolve([username, data])
            })
        })
    },
    checkout: async (username, password) => {
        const cartList = await getCartList(username)
        for (const x in cartList) {
            const historyList = await getHistoryList(username, cartList[x].product_id)
            if (historyList == undefined) {
            conn.query(`INSERT INTO history (username, product_id, quantity) VALUES ('${username}', '${cartList[x].product_id}', '${cartList[x].quantity}')`, err => {
                    if (err) throw err;
                })
            } else {
                conn.query(`UPDATE history SET quantity = '${parseFloat(historyList.quantity) + parseFloat(cartList[x].quantity)}' WHERE id = '${historyList.id}'`, err => {
                    if (err) throw err;
                })
            }
        }
        conn.query(`DELETE FROM cart WHERE username = '${username}'`, err => {
            if (err) throw err;
        })
        return new Promise(resolve => {
            resolve("Success")
        })
    }
}