import { 
    FRIENDS_GET,
    FRIENDS_SET_STATUS,
    FRIENDS_REMOVE,
    FRIENDS_ADD,
} from '../types'

export const get = (friends) => (dispatch) => {
    dispatch({
        type: FRIENDS_GET,
        payload: friends
    })
}

export const add = (user) => (dispatch) => {
    let friend = {
        recipient: user,
        status: 1,
        _id: user._id,
    }

    dispatch({
        type: FRIENDS_ADD,
        payload: friend
    })
}

export const remove = (userId) => (dispatch) => {
    dispatch({
        type: FRIENDS_REMOVE,
        payload: userId
    })
}

export const update = (userId, status) => (dispatch) => {
    dispatch({
        type: FRIENDS_SET_STATUS,
        payload: {userId, status}
    })
}