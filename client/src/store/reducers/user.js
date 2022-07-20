import * as StoreConstants from '../types'

const INITIAL_STATE = {
    isAuth: false
}

const user = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case StoreConstants.USER_LOGIN: {
            return { ...state, ...action.payload, isAuth: true }
        }
        case StoreConstants.USER_LOGOUT:
            return { isAuth: false }
        case StoreConstants.USER_UPDATE_AVATAR:
            return { ...state, avatar: action.payload }
        case StoreConstants.SET_NO_READ_GLOBAL:
            return { ...state, noRead: action.payload }
        default:
            return state
    }
}

export default user