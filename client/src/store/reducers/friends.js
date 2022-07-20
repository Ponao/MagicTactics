import { 
    FRIENDS_GET,
    FRIENDS_SET_STATUS,
    FRIENDS_REMOVE,
    FRIENDS_ADD,
} from '../types'

const INITIAL_STATE = {
    isFetching: true,
    getted: false,
    friends: [],
}

const friends = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FRIENDS_GET: {
            return { ...state, friends: action.payload, canLoad: action.payload.canLoad, isFetching: false, getted: true }
        }
        case FRIENDS_SET_STATUS:
            return { ...state, friends: state.friends.map(friend => 
                action.payload.userId === friend.recipient._id ? 
                { ...friend, status: action.payload.status
                } :
                friend
            ) }
        case FRIENDS_REMOVE:
            return { ...state, friends: [ ...state.friends.filter(friend => {        
                return action.payload !== friend.recipient._id
            })] }
        case FRIENDS_ADD:
            return { ...state, friends: [action.payload, ...state.friends ] }
        default: 
            return state
    }
}

export default friends