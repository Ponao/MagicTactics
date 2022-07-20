import io from 'socket.io-client'
import store from '../store/index'
import * as StoreConstants from '../store/types'
// import {playNewMessage, stopBeep, playRington, stopRington} from './SoundController'

let socket = false

let counterConnect = 0

const SocketController = { 
    init: (_token) => {
        if(socket) 
            return
    
        socket = io(`${process.env.REACT_APP_API_URL}`, {transports: ['websocket', 'polling', 'flashsocket']})
        
        socket.on('connect', () => {
            if(counterConnect > 0)
                window.location.reload()

            socket.emit('auth', _token)
            counterConnect++
        })

        socket.on('request_friend', ({userId, status, user}) => {
            store.dispatch({
                type: StoreConstants.FRIENDS_SET_STATUS,
                payload: {userId, status}
            })
    
            if(store.getState().friends.getted) {
                if(!store.getState().friends.friends.find(x => x._id === userId)) {
                    store.dispatch({
                        type: StoreConstants.FRIENDS_ADD,
                        payload: {_id: userId, recipient: user, status}
                    })
                }
            }
        })

        socket.on('accept_friend', ({userId, status}) => {
            store.dispatch({
                type: StoreConstants.FRIENDS_SET_STATUS,
                payload: {userId, status}
            })
        })

        socket.on('remove_friend', ({userId, status}) => {
            store.dispatch({
                type: StoreConstants.FRIENDS_SET_STATUS,
                payload: {userId, status}
            })

            if(store.getState().friends.getted && status === 0) {
                store.dispatch({
                    type: StoreConstants.FRIENDS_REMOVE,
                    payload: userId
                })
            }
        })

        socket.on('invite', ({user}) => {
            store.dispatch({
                type: StoreConstants.GAME_SET_INVITE,
                payload: {from: 'other', user}
            })
        })

        socket.on('cancel_invite', () => {
            store.dispatch({
                type: StoreConstants.GAME_SET_INVITE,
                payload: {from: '', user: {}}
            })
        })

        socket.on('start_game', ({gameId}) => {
            store.dispatch({
                type: StoreConstants.GAME_SET_REDIRECT,
                payload: gameId
            })
        })

        socket.on('run_game', ({picks, turn, timer}) => {
            picks = {
                myPick: picks.find(x => x.userId === store.getState().user._id)?.pick,
                otherPick: picks.find(x => x.userId !== store.getState().user._id)?.pick,
            }

            store.dispatch({
                type: StoreConstants.GAME_SET_PICKS,
                payload: picks
            })

            store.dispatch({
                type: StoreConstants.GAME_SET_TURN,
                payload: turn
            })

            store.dispatch({
                type: StoreConstants.GAME_SET_TIMER,
                payload: timer
            })
        })

        socket.on('finish_game', ({winner}) => {
            store.dispatch({
                type: StoreConstants.GAME_SET_WINNER,
                payload: winner
            })
        })

        socket.on('change_turn', ({timer, turn, actions}) => {
            store.dispatch({
                type: StoreConstants.GAME_SET_TIMER,
                payload: timer
            })

            store.dispatch({
                type: StoreConstants.GAME_SET_TURN,
                payload: turn
            })

            store.dispatch({
                type: StoreConstants.SKILL_CLEAR,
            })

            store.dispatch({
                type: StoreConstants.GAME_SET_ACTIONS,
                payload: actions
            })

            store.dispatch({
                type: StoreConstants.GAME_RESET_USED,
            })
        })

        socket.on('apply_skill', ({picks, from, id, to, action, turn}) => {
            let myPick = picks.find(x => x.userId === store.getState().user._id)?.pick
            let otherPick = picks.find(x => x.userId !== store.getState().user._id)?.pick

            let side = turn === store.getState().user._id ? 'my' : 'other'

            store.dispatch({
                type: StoreConstants.ANIMATION_ADD,
                payload: {index: to, side, id, action}
            })

            store.dispatch({
                type: StoreConstants.GAME_SET_ACTIONS,
                payload: store.getState().game.actions - 1
            })
            
            setTimeout(() => {
                store.dispatch({
                    type: StoreConstants.GAME_APPLY_SKILL,
                    payload: {myPick, otherPick}
                })
            }, 300)
        })
    },
    connectGame: () => {
        if(socket) {
            let interval = setInterval(() => {
                if(counterConnect > 0) {
                    clearInterval(interval)
                    socket.emit('connect_game')
                }
            }, 100)
        }
    },
    getSocketId: () => {
        return socket.id
    },
    disconnect: () => {
        if(socket)
            socket.disconnect()
    }
}

export default SocketController
