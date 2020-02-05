const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers['user-token']
    try {
        const decoded = jwt.verify(token, 'secret')
        req.username = decoded.username
        next()
    } catch (err){
        console.log(err)
        res.json({
            msg: 'Access denied!'
        })
    }
}