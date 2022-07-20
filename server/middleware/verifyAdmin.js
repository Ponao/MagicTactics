const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

module.exports = async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader("Access-Control-Allow-Methods", "*")
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept')

    const header = req.headers.authorization
    const {_token} = req.body

    if((!header || !header.startsWith('Bearer')) && !_token) {
        return res.json({success: false, errors: [{param: 'all', msg: 'Access token not passed'}]})
    }

    let token

    if(header && header.startsWith('Bearer')) {
        token = header.replace(/^Bearer /, '')
    }
    
    if(_token) {
        token = _token
    }
    
    let user = null
    try {
        user = jwt.verify(token, process.env.JWT_SECRET)
    } catch(e) {
        return res.json({success: false, errors: [{param: 'all', msg: 'Access token is incorrect'}]})
    }

    if(!user.data.uid || user.data.type !== 'admin') {
        return res.json({success: false, errors: [{param: 'all', msg: 'Access token is incorrect'}]})
    }

    res.locals.admin = await Admin.findById(user.data.uid)

    if(!res.locals.admin) {
        return res.json({success: false, errors: [{param: 'all', msg: 'Access token is incorrect'}]})
    }

    return next()
}