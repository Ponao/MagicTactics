import { combineReducers } from 'redux'

import user from './user'
import friends from './friends'
import game from './game'
import skill from './skill'
import animation from './animation'

export default combineReducers({
    user,
    friends,
    game,
    skill,
    animation,
})