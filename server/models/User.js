const { getRandomColor } = require("../controllers/FunctionController")
const mongoose = require("../database")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    nickname: { type: String },
    email: { type: String,  },
    password: { type: String, select: false },
    color: { type: String, default: getRandomColor },
    friends: [{ type: Schema.Types.ObjectId, ref: 'Friend'}],
    resetPasswordExpires: { type: Date, select: false, default: Date.now },
    resetPasswordToken: { type: String, select: false, default: '' },
    emailConfirmToken: { type: String, select: false, default: '' },
    isConfirmed: { type: Boolean, default: false },
    isOnline: { type: Boolean, default: false },
    onlineAt: { type: Number, default: Date.now, },
    createdAt: { type: Date, default: Date.now, },
    buff: Buffer
})

const User = mongoose.model('User', UserSchema)

module.exports = User
