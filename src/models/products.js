const conn = require('../configs/database')

module.exports = {
    getProducts: (sort) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM product ORDER BY ${sort || 'id'} ASC`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getOneProduct: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM product WHERE id = ${id}`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    insertProduct: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`INSERT INTO product SET ?`, data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateProduct: (id, data) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE product SET ? WHERE id = ${id}`, data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(`DELETE FROM product WHERE id = ${id}`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}