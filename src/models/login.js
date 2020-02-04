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
    create: async (username, password) => {
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
    verify: (req, res, next) => {
        token = req.headers['x-access-token']
        try {
            const decoded = jwt.verify(token, 'secret')
            console.log(decoded)
            next()
        } catch (err){
            console.log(err)
            res.json({
                msg: 'Access denied!'
            })
        }
    }
}