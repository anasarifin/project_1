const conn = require('../configs/database')

module.exports = {
    getCategories: (sort) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM category ORDER BY ${sort || 'id'} ASC`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getOneCategory: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM category WHERE id = ${id}`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    insertCategory: (name) => {
        return new Promise((resolve, reject) => {
            conn.query(`INSERT INTO category SET ?`, name, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateCategory: (id, name) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE category SET name = '${name}' WHERE id = ${id}`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteCategory: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(`DELETE FROM category WHERE id = ${id}`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}