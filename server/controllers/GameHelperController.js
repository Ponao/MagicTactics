const Game = require("../models/Game")
const { sendChangeTurn, sendFinishGame } = require("./SocketController")
const GAME_VARIABLES = require("../gameSettings")
const { setTurnTimer, clearTimer } = require("./GameTimerController")

module.exports = {
    changeTurn: async (gameId) => {
        try {
            let game = await Game.findOne({_id: gameId})

            game.timer = new Date().getTime() + GAME_VARIABLES.turnTimer

            game.turn = String(game.turn) === String(game.players[0]) ? game.players[1] : game.players[0]

            game.picks = game.picks.map(pick => {
                return {...pick, pick: pick.pick.map(t => ({...t, isUsed: false}))}
            })

            let aliveLength = game.picks.find(pick => String(pick.userId) === String(game.turn)).pick.filter(x => !x.isDead).length

            if(aliveLength < GAME_VARIABLES.actions) {
                game.actions = aliveLength
            } else {
                game.actions = GAME_VARIABLES.actions
            }

            sendChangeTurn({gameId: game._id, timer: game.timer, turn: game.turn, actions: game.actions})
            clearTimer(game._id)
            setTurnTimer(game._id)

            await game.save()
        } catch (e) {
            console.log(e)
        }
    },
    checkWin: async (gameId) => {
        try {
            let game = await Game.findOne({_id: gameId})

            let leftAliveTeam1 = game.picks[0].pick.find(x => !x.isDead)
            let leftAliveTeam2 = game.picks[1].pick.find(x => !x.isDead)

            if(!!leftAliveTeam1 && !!leftAliveTeam2)
                return

            if(!leftAliveTeam1) {
                game.stage = 'finish'
                game.winner = game.picks[1].userId
            }

            if(!leftAliveTeam2) {
                game.stage = 'finish'
                game.winner = game.picks[0].userId
            }

            sendFinishGame({gameId: game._id, winner: game.winner})

            await game.save()
        } catch (e) {
            console.log(e)
        }
    },
}