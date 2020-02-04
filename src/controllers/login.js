const login = require('../models/login')

module.exports = {
    create: (req, res) => {
        const username = req.body.username
        const password = req.body.password
        login.create(username, password)
        .then(resolve => {
            res.json({token: resolve})
        })
        .catch(reject => {
            res.json({msg: reject})
        })



        // const token = jwt.sign({username: username, password: password}, 'xxx')
        // res.json({
        //     token: token
        // })
    }
}