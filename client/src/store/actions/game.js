import { 
    GAME_SET_INVITE,
    GAME_SET,
    GAME_SET_REDIRECT,
} from '../types'

export const invite = (user) => (dispatch) => {
    dispatch({
        type: GAME_SET_INVITE,
        payload: {from: 'me', user}
    })
}

export const cancelInvite = () => (dispatch) => {
    dispatch({
        type: GAME_SET_INVITE,
        payload: {from: '', user: {}}
    })
}

export const setGame = (game, myId) => (dispatch) => {
    game = {
        _id: game._id,
        stage: game.stage,
        myPick: game.picks.find(x => x.userId === myId)?.pick,
        otherPick: game.picks.find(x => x.userId !== myId)?.pick,
        turn: game.turn,
        timer: game.timer,
        actions: game.actions,
    }

    dispatch({
        type: GAME_SET,
        payload: game
    })
}

export const removeRedirect = () => (dispatch) => {
    dispatch({
        type: GAME_SET_REDIRECT,
        payload: ''
    })
}