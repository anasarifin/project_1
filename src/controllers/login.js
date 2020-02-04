const login = require('../models/login')

module.exports = {
    createToken: (req, res) => {
        const username = req.body.username
        const password = req.body.password
        login.createToken(username, password)
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