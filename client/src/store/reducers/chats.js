import * as StoreConstants from '../types'

const INITIAL_STATE = {
    chats: [],
    isGetted: false,
    isFetching: true,
    isPreFetching: false
}

const chats = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case StoreConstants.GET_CHATS: {
            return { ...state, chats: [...state.chats, ...action.payload.chats], isGetted: true, isFetching: false }
        }
        case StoreConstants.ADD_CHAT: {
            return { ...state, chats: [action.payload.chat, ...state.chats] }
        }
        case StoreConstants.GET_MESSAGES:
            return { 
                ...state, 
                chats: !!state.chats.find(
                    chat => chat.user._id === action.payload.userId) ? 
                        state.chats.map(
                            chat => chat.user._id === action.payload.userId ? 
                            {
                                ...chat, 
                                isGetted: true,
                                isPreFetching: false,
                                messages: [...action.payload.messages, ...chat.messages]
                            } : 
                            chat
                        ) :
                        [{...action.payload.chat, messages: action.payload.messages }, ...state.chats]
            }
        case StoreConstants.ADD_MESSAGE:
            return { 
                ...state, 
                chats: state.chats.map(
                    chat => chat.user._id === action.payload.userId ? 
                        {
                            ...chat, 
                            lastMessage: action.payload.message,
                            messages: [...chat.messages, action.payload.message], 
                            noRead: action.payload.myId === action.payload.userId ? chat.noRead+1 : chat.noRead 
                        } : 
                        chat
                ).sort((a, b) => {
                    if(!(a.lastMessage && b.lastMessage))
                        return 0
    
                    a = new Date(a.lastMessage.createdAt);
                    b = new Date(b.lastMessage.createdAt);
                    
                    return a>b ? -1 : a<b ? 1 : 0;
                })
            }
        case StoreConstants.SET_NO_READ:
            return {
                ...state,
                chats: state.chats.map(
                    chat => chat.user._id === action.payload.userId ? 
                        { ...chat, noRead: action.payload.noRead } : 
                        chat
                )
            }
        case StoreConstants.READ_MESSAGES:
            return {
                ...state,
                chats: state.chats.map(
                    chat => chat.user._id === action.payload.userId ? 
                        {
                            ...chat, 
                            lastMessage: chat.lastMessage.user._id !== action.payload.myId ? 
                                {...chat.lastMessage, isRead: true} : 
                                chat.lastMessage, 
                            messages: chat.messages.map(
                                message => message.user._id !== action.payload.myId ? 
                                    {...message, isRead: true} : 
                                    message
                            )
                        } :
                        chat
                )
            }
        case StoreConstants.UPDATE_ONLINE:
            return {
                ...state,
                chats: state.chats.map(
                    chat => chat.user._id === action.payload.userId ?
                        {
                            ...chat,
                            user: { ...chat.user, isOnline: action.payload.online.isOnline, onlineAt: action.payload.online.onlineAt }
                        } :
                        chat
                )
            }
        case StoreConstants.SET_TYPING:
            return {
                ...state,
                chats: state.chats.map(
                    chat => chat.user._id === action.payload.userId ?
                        {
                            ...chat,
                            isTyping: action.payload.isTyping
                        } :
                        chat
                )
            }
        default:
            return state
    }
}

export default chats