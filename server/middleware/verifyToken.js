const jwt = require('jsonwebtoken')
const User = require('../models/User')

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

    if(!user.data.uid) {
        return res.json({success: false, errors: [{param: 'all', msg: 'Access token is incorrect'}]})
    }

    res.locals.user = await User.findById(user.data.uid).select('+isBan').select('+emailConfirmToken').populate('categories')

    if(!res.locals.user)
        return res.json({success: false, errors: [{param: 'all', msg: 'Access token is incorrect'}]})

    return next()
}