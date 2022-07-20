const User = require("../models/User")
const Invite = require("../models/Invite")
const Game = require("../models/Game")
const { sendChangeTurn, sendRunGame } = require("./SocketController")
const characters = require("../characters")
const { shuffleArray } = require("./FunctionController")
const GAME_VARIABLES = require("../gameSettings")

let activeTimers = {}

const GameTimerController = {
    setTurnTimer: async (gameId) => {
        try {        
            activeTimers[gameId] = setTimeout(async () => {
                let game = await Game.findOne({_id: gameId})

                if(!!game) {
                    game.timer = new Date().getTime() + GAME_VARIABLES.turnTimer

                    game.turn = String(game.turn) === String(game.players[0]) ? game.players[1] : game.players[0]

                    game.picks = [...game.picks.map(pick => {
                        return {...pick, pick: pick.pick.map(t => ({...t, isUsed: false}))}
                    })]

                    let aliveLength = game.picks.find(pick => String(pick.userId) === String(game.turn)).pick.filter(x => !x.isDead).length

                    if(aliveLength < GAME_VARIABLES.actions) {
                        game.actions = aliveLength
                    } else {
                        game.actions = GAME_VARIABLES.actions
                    }

                    await game.save()
                    sendChangeTurn({gameId, timer: game.timer, turn: game.turn, actions: game.actions})
                    GameTimerController.setTurnTimer(gameId)
                }
            }, GAME_VARIABLES.turnTimer)
        } catch (e) {
            console.log(e)
        }
    },
    setPickTimer: async (gameId) => {
        try {        
            activeTimers[gameId] = setTimeout(async () => {
                let game = await Game.findOne({_id: gameId})

                if(!!game) {
                    let charactersArray = Object.values(characters)

                    let team1 = shuffleArray(charactersArray).slice(0, GAME_VARIABLES.teamLength)
                    let team2 = shuffleArray(charactersArray).slice(0, GAME_VARIABLES.teamLength)

                    let picks = game.picks.length === 0 ? [
                        {userId: game.players[0], pick: team1},
                        {userId: game.players[1], pick: team2}
                    ] : [
                        game.picks[0],
                        String(game.picks[0].userId) === String(game.players[0]) ? 
                            {userId: game.players[1], pick: team2} :
                            {userId: game.players[0], pick: team2}
                    ]

                    game.picks = picks

                    game.stage = 'run'
                    game.timer = new Date().getTime() + GAME_VARIABLES.turnTimer

                    await game.save()

                    sendRunGame({gameId: game._id, picks: game.picks, turn: game.turn, timer: game.timer})

                    GameTimerController.setTurnTimer(gameId)
                }
            }, GAME_VARIABLES.pickTimer)
        } catch (e) {
            console.log(e)
        }
    },
    clearTimer: async (gameId) => {
        try {        
            if(!!activeTimers[gameId]) {
                clearTimeout(activeTimers[gameId])
                delete activeTimers[gameId]
            }
        } catch (e) {
            console.log(e)
        }
    },
}

module.exports = GameTimerController