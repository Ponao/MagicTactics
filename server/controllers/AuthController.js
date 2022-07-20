const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
// const { randomString, randomInteger } = require('./FunctionController')
// const { sendConfirmEmail } = require("./MailController")

module.exports = {
    login: async (req, res, next) => {
        const { email, password } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ success: false, errors: errors.array() })
        }

        try {
            const user = await User.findOne({email}).select('+password')

            if(user) {
                const verifiedPassword = await bcrypt.compare(password, user.password)
                
                if (verifiedPassword) {
                    let token = await generateToken(user._id)
                    
                    return res.json({ token, user, success: true })
                }
            }
        } catch(e) {
            console.log(e)
            const err = {}
            err.param = `all`
            err.msg = `Something goes wrong...`
            return res.status(401).json({ success: false, errors: [err] })
        }

        const err = {}
        err.param = `all`
        err.msg = `Email or password wrong`
        return res.status(401).json({ success: false, errors: [err] })
    },
    register: async (req, res, next) => {
        const { email, password, nickname } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ success: false, errors: errors.array() })
        }

        try {
            const existingUserEmail = await User.findOne({email})
      
            if (existingUserEmail) {
                return res.status(409).json({ success: false, errors: [{param: 'all', msg: 'Email already used'}] })
            }
    
            const newUser = new User();
            
            newUser.email = email
            newUser.password = await bcrypt.hash(password, 12)
            newUser.nickname = nickname
            // newUser.emailConfirmToken = randomInteger(100000, 999999)
    
            await newUser.save()

            let token = await generateToken(newUser._id)
    
            // sendConfirmEmail(newUser, newUser.emailConfirmToken)
    
            return res.json({ success: true, token, user: newUser })
        } catch (e) {
            console.log(e);
            const err = {}
            err.param = `all`
            err.msg = `Something goes wrong...`
            return res.status(401).json({ success: false, errors: [err] })
        }
    },
}

function generateToken(uid) {
    return jwt.sign(
        {
            data: { uid },
        },
        process.env.JWT_SECRET
    )
}