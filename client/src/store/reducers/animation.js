import { 
    ANIMATION_ADD,
    ANIMATION_REMOVE,
} from '../types'

const INITIAL_STATE = {
    for: []
}

const animation = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ANIMATION_ADD: {
            return { ...state, for: [...state.for, action.payload] }
        }
        case ANIMATION_REMOVE: {
            return { ...state, for: state.for.filter(x => x.index !== action.payload.index && x.side !== action.payload.side) }
        }
        default: 
            return state
    }
}

export default animation