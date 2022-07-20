const mongoose = require("../database");
const Schema = mongoose.Schema;

const InviteSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User'},
    to: { type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: { type: Date, default: Date.now },
    buff: Buffer
});

const Invite = mongoose.model('Invite', InviteSchema);

module.exports = Invite;