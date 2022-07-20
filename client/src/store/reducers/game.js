import { 
    GAME_APPLY_SKILL,
    GAME_SET,
    GAME_SET_INVITE, 
    GAME_SET_PICKS, 
    GAME_SET_REDIRECT,
    GAME_SET_TIMER,
    GAME_SET_TURN,
    GAME_SET_ACTIONS,
    GAME_RESET_USED,
    GAME_SET_WINNER,
} from '../types'

const INITIAL_STATE = {
    _id: '',
    stage: '', // pick, run, finish
    myPick: [],
    otherPick: [],
    turn: '',
    timer: 0,
    winner: '',
    actions: 3,
    invite: {
        from: '', // me, other
        user: {}
    },
    redirect: ''
}

const game = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GAME_SET_INVITE: {
            return { ...state, invite: action.payload }
        }
        case GAME_SET_REDIRECT: {
            return { ...state, redirect: action.payload }
        }
        case GAME_SET: {
            return { ...state, ...action.payload }
        }
        case GAME_SET_PICKS: {
            return { ...state, ...action.payload, stage: 'run' }
        }
        case GAME_SET_TURN: {
            return { ...state, turn: action.payload }
        }
        case GAME_SET_TIMER: {
            return { ...state, timer: action.payload }
        }
        case GAME_APPLY_SKILL: {
            return { ...state, ...action.payload }
        }
        case GAME_SET_ACTIONS: {
            return { ...state, actions: action.payload }
        }
        case GAME_RESET_USED: {
            return { ...state, myPick: state.myPick.map(t => ({...t, isUsed: false})) }
        }
        case GAME_SET_WINNER: {
            return { ...state, winner: action.payload, stage: 'finish' }
        }
        default: 
            return state
    }
}

export default game