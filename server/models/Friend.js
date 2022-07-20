const mongoose = require("../database");
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
    requester: { type: Schema.Types.ObjectId, ref: 'User'},
    recipient: { type: Schema.Types.ObjectId, ref: 'User'},
    status: {
        type: Number,
        enums: [
            0,    //'add friend',
            1,    //'requested',
            2,    //'pending',
            3,    //'friends'
        ]
    },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    buff: Buffer
});

const Friend = mongoose.model('Friend', FriendSchema);

module.exports = Friend;