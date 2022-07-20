import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../store/actions/user'
import * as gameActions from '../../store/actions/game'
import * as skillActions from '../../store/actions/skill'
import { withRouter } from "react-router-dom"
import Timer from './Timer'
import Character from './Character'

class Run extends React.Component {
    state = {
        pick: []
    }

    render() {
        return <div className="page-block">
            <div className='characters-box'>
                {this.props.game.otherPick.map((character, index) => <Character index={index} type='enemy_team' key={character.name} character={character} />)}
            </div>

            {this.props.user._id !== this.props.game.turn && <h1 className='game-title'>Opponent's turn</h1>}
            {this.props.user._id === this.props.game.turn && <h1 className='game-title'>Your turn</h1>}

            <Timer />

            {this.props.game.actions}

            <div className='characters-box'>
                {this.props.game.myPick.map((character, index) => <Character index={index} type='my_team' key={character.name} character={character} />)}
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        game: state.game,
        skill: state.skill,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        gameActions: bindActionCreators(gameActions, dispatch),
        skillActions: bindActionCreators(skillActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Run))