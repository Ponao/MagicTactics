const mongoose = require("../database");
const GAME_VARIABLES = require("../gameSettings");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    players: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    picks: [{type: Object}],
    stage: {type: String, default: 'pick'},
    turn: {type: String},
    winner: {type: String},
    timer: {type: Number, default: 0},
    actions: {type: Number, default: GAME_VARIABLES.actions},
    createdAt: { type: Date, default: Date.now },
    buff: Buffer
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;