module.exports = async (req, res, next) => {
    if(res.locals.user && res.locals.user.isBan)
        return res.json({success: false, errors: [{param: 'all', msg: 'Your account banned.'}]})

    return next()
}