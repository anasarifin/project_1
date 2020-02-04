const login = require('../models/login')
const bcrypt = require('bcryptjs')

function hash(password) {
    return new Promise(resolve => {
        bcrypt.hash('myPassword', 10, function(err, hash) {
            if (err) throw err;
            resolve(hash)
        })
    })
}

module.exports = {
    login: (req, res) => {
        const username = req.body.username
        const password = req.body.password
        login.login(username, password)
        .then(resolve => {
            res.json({token: resolve})
        })
        .catch(reject => {
            res.json({msg: reject})
        })
    },
    register: (req, res) => {
        const username = req.body.username
        const password = req.body.password
        
        login.register(username, password)
        .then(resolve => {
            console.log('success');
            res.json(resolve)
        }).catch(reject => {
            console.log('gagal');
            res.json({msg: reject})
        })
    }



        // const token = jwt.sign({username: username, password: password}, 'xxx')
        // res.json({
        //     token: token
        // })

}