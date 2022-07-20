import { 
    ANIMATION_ADD,
    ANIMATION_REMOVE,
} from '../types'

export const addAnimation = (index, side, id) => (dispatch) => {
    dispatch({
        type: ANIMATION_ADD,
        payload: {index, side, id}
    })
}

export const removeAnimation = (index, side) => (dispatch) => {
    dispatch({
        type: ANIMATION_REMOVE,
        payload: {index, side}
    })
}