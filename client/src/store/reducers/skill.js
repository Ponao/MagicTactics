import { 
    SKILL_SET,
    SKILL_CLEAR,
} from '../types'

const INITIAL_STATE = {
    from: '',
    id: '',
    action: '',
    isActive: false,
}

const skill = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SKILL_SET: {
            return { ...state, ...action.payload, isActive: true }
        }
        case SKILL_CLEAR: {
            return { ...INITIAL_STATE }
        }
        default: 
            return state
    }
}

export default skill