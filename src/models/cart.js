const conn = require('../configs/database')

function getQuantity(x, username) {
    return new Promise(resolve => {
        conn.query(`SELECT quantity FROM cart WHERE product_id = '${x}' AND username = '${username}'`, (err, data) => {
            if (err) throw err;
            resolve(data[0])
        })
    })
}
function checkExist(x) {
    return new Promise(resolve => {
        conn.query(`SELECT id FROM product WHERE id = '${x}'`, (err, data) => {
            if (err) throw err;
            resolve(data[0])
        })
    })
}
function getCartList(username) {
    return new Promise(resolve => {
        conn.query(`SELECT product_id, quantity FROM cart WHERE username = '${username}'`, (err, data) => {
            if (err) throw err;
            resolve(data)
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
    getCart: (username, page, sort) => {
        if (!page) {
            limit = ""
        } else {
            limit = ' LIMIT ' + ((page * 5) - 5) + ', 5'
        }
        if (!sort) {
            order = 'product_id'
        } else {
            order = sort
        }
        return new Promise(resolve => {
            conn.query(`SELECT c.quantity, p.id AS product_id, p.name, p.price, p.category_id, p.description, c.updated_at FROM cart c LEFT JOIN product p ON c.product_id = p.id WHERE username = '${username}' ORDER BY ${order}${limit}`, (err, data) => {
                if (err) throw err;
                resolve([username, data])
            })
        })
    },
    addCart: async (username, data) => {
        for (const x in data) {
            console.log(await checkExist(x));
            if(await checkExist(x)) {
            const qty = await getQuantity(x)
            console.log(qty);
                if (qty == undefined) {
                    conn.query(`INSERT INTO cart (username, product_id, quantity) VALUES ('${username}', '${x}', '${data[x]}')`, (err, data) => {
                        console.log('baru');
                        if (err) throw err;
                    })
                } else {
                    conn.query(`UPDATE cart SET quantity = '${parseFloat(qty.quantity) + parseFloat(data[x])}' WHERE username = '${username}' AND product_id = '${x}'`, (err, data) => {
                        if (err) throw err;
                    })
                }
            }
        }
        return new Promise(resolve => {
            resolve('Finish')
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
            resolve('Finish')
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
            resolve('Finish')
        })
    }
}