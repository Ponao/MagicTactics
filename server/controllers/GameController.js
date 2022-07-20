const User = require("../models/User")
const Invite = require("../models/Invite")
const Game = require("../models/Game")
const { sendInviteGame, sendCancelInviteGame, sendStartGame, sendRunGame, sendSkill, sendChangeTurn } = require("./SocketController")
const FunctionController = require("./FunctionController")
const characters = require("../characters")
const { checkIfDuplicateExists } = require("./FunctionController")
const GAME_VARIABLES = require("../gameSettings")
const { setTurnTimer, setPickTimer, clearTimer } = require("./GameTimerController")
const SkillController = require("./SkillController")
const GameHelperController = require("./GameHelperController")

module.exports = {
    get: async (req, res, next) => {
        let user = res.locals.user

        try {        
            let game = await Game.findOne({players: {$eq: user._id}, stage: {$ne: 'finish'}}).populate(
                {path: 'players', options: {select: ['-friends']}}
            )

            if(!game) {
                const err = {}
                err.param = `all`
                err.msg = `Game not found.`
                return res.status(401).json({ success: false, errors: [err] })
            }

            return res.json({success: true, game})
        } catch (e) {
            console.log(e)
            const err = {}
            err.param = `all`
            err.msg = `Something goes wrong...`
            return res.status(401).json({ success: false, errors: [err] })
        }
    },
    invite: async (req, res, next) => {
        const { _id } = req.body;
        let user = res.locals.user

        try {        
            let otherUser = await User.findOne({_id})

            if(!otherUser) {
                const err = {}
                err.param = `all`
                err.msg = `User not found.`
                return res.status(401).json({ success: false, errors: [err] })
            }

            if(!otherUser.isOnline) {
                const err = {}
                err.param = `all`
                err.msg = `User offline.`
                return res.status(401).json({ success: false, errors: [err] })
            }

            let isBusy = await Invite.findOne({to: _id})
            let isBusy2 = await Invite.findOne({from: _id})
            let game = await Game.findOne({players: {$eq: _id}, stage: {$ne: 'finish'}})

            if(!!isBusy || !!game || !!isBusy2) {
                const err = {}
                err.param = `all`
                err.msg = `User busy.`
                return res.status(401).json({ success: false, errors: [err] })
            }

            let invite = new Invite()

            invite.to = _id
            invite.from = user._id

            await invite.save()

            sendInviteGame({user: user, userId: _id})

            return res.json({success: true})
        } catch (e) {
            console.log(e)
            const err = {}
            err.param = `all`
            err.msg = `Something goes wrong...`
            return res.status(401).json({ success: false, errors: [err] })
        }
    },
    cancelInvite: async (req, res, next) => {
        let user = res.locals.user

        try {
            let existInvite = await Invite.findOne({$or: [ 
                { from: user._id }, 
                { to: user._id } 
            ]})

            if(!!existInvite) {
                if(String(existInvite.from) === String(user._id)) {
                    sendCancelInviteGame({userId: existInvite.to})
                }

                if(String(existInvite.to) === String(user._id)) {
                    sendCancelInviteGame({userId: existInvite.from})
                }

                await existInvite.delete()
            }

            return res.json({success: true})
        } catch (e) {
            console.log(e)
            const err = {}
            err.param = `all`
            err.msg = `Something goes wrong...`
            return res.status(401).json({ success: false, errors: [err] })
        }
    },
    acceptInvite: async (req, res, next) => {
        let user = res.locals.user

        try {
            let existInvite = await Invite.findOne({$or: [ 
                { from: user._id }, 
                { to: user._id } 
            ]})

            if(!!existInvite) {
                let game = new Game()

                game.players = [existInvite.to, existInvite.from]

                let randomTurn = FunctionController.randomInteger(1, 2)

                if(randomTurn === 1) {
                    game.turn = existInvite.to
                }

                if(randomTurn === 2) {
                    game.turn = existInvite.from
                }

                game.timer = new Date().getTime() + GAME_VARIABLES.pickTimer

                await game.save()

                sendStartGame({userId: existInvite.to, gameId: game._id})
                sendStartGame({userId: existInvite.from, gameId: game._id})

                setPickTimer(game._id)

                await existInvite.delete()
            } else {
                const err = {}
                err.param = `all`
                err.msg = `Invitation has expired.`
                return res.status(401).json({ success: false, errors: [err] })
            }

            return res.json({success: true})
        } catch (e) {
            console.log(e)
            const err = {}
            err.param = `all`
            err.msg = `Something goes wrong...`
            return res.status(401).json({ success: false, errors: [err] })
        }
    },
    pickTeam: async (req, res, next) => {
        const { pick } = req.body;
        let user = res.locals.user

        try {        
            let game = await Game.findOne({players: {$eq: user._id}})

            if(!game) {
                const err = {}
                err.param = `all`
                err.msg = `Game not found.`
                return res.status(401).json({ success: false, errors: [err] })
            }

            if(!!game.picks.find(x => x.userId === user._id)) {
                const err = {}
                err.param = `all`
                err.msg = `You already picked team.`
                return res.status(401).json({ success: false, errors: [err] })
            }

            if(!Array.isArray(pick)) {
                const err = {}
                err.param = `all`
                err.msg = `Incorrect pick.`
                return res.status(401).json({ success: false, errors: [err] })
            }

            if(checkIfDuplicateExists(pick)) {
                const err = {}
                err.param = `all`
                err.msg = `Incorrect pick.`
                return res.status(401).json({ success: false, errors: [err] })
            }

            let team = {}

            team.userId = user._id
            team.pick = []

            let total = 0

            for (let i = 0; i < GAME_VARIABLES.teamLength; i++) {
                if(!!characters[pick[i]]) {
                    team.pick.push(characters[pick[i]])
                    total++
                }
            }

            if(total < GAME_VARIABLES.teamLength) {
                const err = {}
                err.param = `all`
                err.msg = `Incorrect pick.`
                return res.status(401).json({ success: false, errors: [err] })
            }

            game.picks = [...game.picks, team]

            if(game.picks.length === 2) {
                game.stage = 'run'
                game.timer = new Date().getTime() + GAME_VARIABLES.turnTimer

                sendRunGame({gameId: game._id, picks: game.picks, turn: game.turn, timer: game.timer})
                clearTimer(game._id)
                setTurnTimer(game._id)
            }            

            await game.save()

            return res.json({success: true})
        } catch (e) {
            console.log(e)
            const err = {}
            err.param = `all`
            err.msg = `Something goes wrong...`
            return res.status(401).json({ success: false, errors: [err] })
        }
    },
    applySkill: async (req, res, next) => {
        const { from, id, to } = req.body;
        let user = res.locals.user

        try {
            let game = await Game.findOne({players: {$eq: user._id}})

            if(!game) {
                const err = {}
                err.param = `all`
                err.msg = `Game not found.`
                return res.status(401).json({ success: false, errors: [err] })
            }

            if(game.stage !== 'run') {
                const err = {}
                err.param = `all`
                err.msg = `Game not running.`
                return res.status(401).json({ success: false, errors: [err] })
            }

            if(String(game.turn) !== String(user._id)) {
                const err = {}
                err.param = `all`
                err.msg = `Not your turn.`
                return res.status(401).json({ success: false, errors: [err] })
            }

            if(game.actions < 1) {
                const err = {}
                err.param = `all`
                err.msg = `You dont have actions.`
                return res.status(401).json({ success: false, errors: [err] })
            }

            let myPick = game.picks.find(x => String(x.userId) === String(user._id))
            let otherPick = game.picks.find(x => String(x.userId) !== String(user._id))

            let skillResult = SkillController.applySkill(myPick, otherPick, from, id, to, game._id)

            if(!skillResult.success) {
                const err = {}
                err.param = `all`
                err.msg = `Incorrect skill.`
                return res.status(401).json({ success: false, errors: [err] })
            }

            sendSkill({picks: skillResult.picks, from, id, to, gameId: game._id, turn: game.turn, action: skillResult.action})
 
            game.picks = skillResult.picks
            game.actions = game.actions - 1

            await game.save()
            
            if(game.actions < 1) {
                GameHelperController.changeTurn(game._id)
            }

            GameHelperController.checkWin(game._id)

            return res.json({success: true})
        } catch (e) {
            console.log(e)
            const err = {}
            err.param = `all`
            err.msg = `Something goes wrong...`
            return res.status(401).json({ success: false, errors: [err] })
        }
    },
}