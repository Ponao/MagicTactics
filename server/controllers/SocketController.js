const User = require('../models/User')
const Invite = require('../models/Invite')
const jwt = require('jsonwebtoken')
const Game = require('../models/Game')

let io = false

function initSocket(initIo) {
    io = initIo
    io.on('connection', (socket) => {
        let user = false

        let disconnectTimer = setTimeout(() => {
            socket.disconnect('unauthorized')
        }, 10000)
    
        socket.on('auth', async _token => {
            clearTimeout(disconnectTimer)

            let userVerify = {}

            try {
                userVerify = jwt.verify(_token, process.env.JWT_SECRET)
            } catch (e) {
                socket.disconnect('unauthorized')
                return
            }

            if (!userVerify.data.uid) {
                socket.disconnect('unauthorized')
                return
            }

            user = await User.findById(userVerify.data.uid)

            if(user) {
                user.isOnline = true

                await user.save()

                socket.join(`user.${user._id}`)
            } else {
                socket.disconnect('unauthorized')
            }
        })

        socket.on('connect_game', async () => {
            if(user) {
                let game = await Game.findOne({players: {$eq: user._id}})

                if(!!game)
                    socket.join(`game.${game._id}`)
            }
        })

        socket.on('disconnect', async () => {
            if(user) {
                user.onlineAt = Date.now()
                user.isOnline = false
                await user.save()

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
            } 
        })
    })
}

function sendMessage({message, myId, otherId, socketId}) {
    let socket = io.sockets.sockets.get(socketId)

    if(socket) {
        socket.to(`user.${otherId}`).emit('sendMessage', ({message, otherUserId: myId}))

        if(myId !== otherId)
            socket.to(`user.${myId}`).emit('sendMessage', ({message, otherUserId: otherId}))
    } else {
        io.to(`user.${otherId}`).emit('sendMessage', ({message, otherUserId: myId}))

        if(myId !== otherId)
            io.to(`user.${myId}`).emit('sendMessage', ({message, otherUserId: otherId}))
    }
}

function readMessages({myId, otherId, socketId}) {
    let socket = io.sockets.sockets.get(socketId)

    if(socket) {
        socket.to(`user.${otherId}`).emit('readMessages', ({userId: myId, otherUserId: otherId}))

        if(myId !== otherId)
            socket.to(`user.${myId}`).emit('readMessages', ({userId: myId, otherUserId: otherId}))
    } else {
        io.to(`user.${otherId}`).emit('readMessages', ({userId: myId, otherUserId: otherId}))

        if(myId !== otherId)
            io.to(`user.${myId}`).emit('readMessages', ({userId: myId, otherUserId: otherId}))
    }
}

function sendTyping({otherId, myId}) {
    io.to(`user.${otherId}`).emit('sendTyping', ({userId: myId}))
}

function sendRequestFriend({userId, otherId, status, user}) {
    io.to(`user.${otherId}`).emit('request_friend', {userId, status, user})
}

function sendAcceptFriend({userId, otherId, status}) {
    io.to(`user.${otherId}`).emit('accept_friend', {userId, status})
}

function sendRemoveFriend({userId, otherId, status}) {
    io.to(`user.${otherId}`).emit('remove_friend', {userId, status})
}

function sendInviteGame({user, userId}) {
    io.to(`user.${userId}`).emit('invite', {user})
}

function sendCancelInviteGame({userId}) {
    io.to(`user.${userId}`).emit('cancel_invite')
}

function sendStartGame({userId, gameId}) {
    io.to(`user.${userId}`).emit('start_game', {gameId})
}

function sendRunGame({gameId, picks, turn, timer}) {
    io.to(`game.${gameId}`).emit('run_game', {picks, turn, timer})
}

function sendFinishGame({gameId, winner}) {
    io.to(`game.${gameId}`).emit('finish_game', {winner})
}

function sendChangeTurn({gameId, turn, timer, actions}) {
    io.to(`game.${gameId}`).emit('change_turn', {timer, turn, actions})
}

function sendSkill({picks, from, id, to, gameId, turn, action}) {
    io.to(`game.${gameId}`).emit('apply_skill', {picks, from, id, to, turn, action})
}

module.exports = {
    initSocket,
    sendMessage,
    readMessages,
    sendTyping,
    sendRequestFriend,
    sendAcceptFriend,
    sendRemoveFriend,
    sendInviteGame,
    sendCancelInviteGame,
    sendStartGame,
    sendRunGame,
    sendChangeTurn,
    sendSkill,
    sendFinishGame,
}