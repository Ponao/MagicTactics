import { 
    SKILL_SET,
    SKILL_CLEAR,
} from '../types'

export const setSkill = (from, id, action) => (dispatch) => {
    dispatch({
        type: SKILL_SET,
        payload: {from, id, action}
    })
}

export const clearSkill = () => (dispatch) => {
    dispatch({
        type: SKILL_CLEAR,
    })
}