const conn = require('../configs/database')
const jwt = require('jsonwebtoken')

function checkUsername(username) {
    return new Promise(resolve => {
        conn.query(`SELECT username FROM user WHERE username = '${username}'`, (err, data) => {
            if (err) throw err;
            resolve(data[0])
        })
    })
}
function checkPassword(username) {
    return new Promise(resolve => {
        conn.query(`SELECT password FROM user WHERE username = '${username}'`, (err, data) => {
            if (err) throw err;
            resolve(data[0].password)
        })
    })
}

module.exports = {
    createToken: async (username, password) => {
        if (await checkUsername(username)) {
            if (await checkPassword(username) == password) {
                return new Promise(resolve => {
                    resolve(jwt.sign({username: username}, 'secret'))
                })
            }
        }
        return new Promise((resolve, reject) => {
            reject('Username or password incorrect!')
        })
    },
    register: (username, password) => {
        return new Promise(async (resolve, reject) => {
            const regex = /[a-z0-9]/gi
            if (username.length >= 4 && username.length <=12 && regex.test(username)) {
                if (password.length >= 6 && regex.test(password)) {
                    if (await checkUsername(username) == undefined) {
                        conn.query(`INSERT INTO user SET username = '${username}', password = '${password}'`, (err, result) => {
                            if (err) throw err;
                            resolve(result)
                        })
                    } else {
                        reject('Username is already taken!')
                    }
                } else {
                    reject('Password must have min 6 character and not included special char!')
                }
            } else {
                reject('Username must contain 4 - 12 character and not included special char!')
            }
        })
    }
}