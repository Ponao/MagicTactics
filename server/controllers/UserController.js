const User = require("../models/User")
// const { randomString } = require("./FunctionController")

module.exports = {
    me: async (req, res, next) => {
        let user = res.locals.user

        try {
            return res.json({success: true, user})
        } catch (e) {
            console.log(e)
            const err = {}
            err.param = `all`
            err.msg = `Something goes wrong...`
            return res.status(401).json({ success: false, errors: [err] })
        }
    },
    getOnline: async (req, res, next) => {
        const { _id } = req.params

        try {
            let user = await User.findById(_id)

            if(!user) {
                const err = {}
                err.param = `all`
                err.msg = `User not found.`
                return res.status(401).json({ success: false, errors: [err] })
            }

            let online = {
                isOnline: user.isOnline,
                onlineAt: user.onlineAt
            }

            return res.json({success: true, online})
        } catch (e) {
            console.log(e)
            const err = {}
            err.param = `all`
            err.msg = `Something goes wrong...`
            return res.status(401).json({ success: false, errors: [err] })
        }
    },
}