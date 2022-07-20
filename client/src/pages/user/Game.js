import React from 'react'
import gameApi from '../../apis/game'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../store/actions/user'
import * as gameActions from '../../store/actions/game'
import { withRouter } from "react-router-dom"
import Pick from '../../components/game/Pick'
import SocketController from '../../controllers/SocketController'
import Run from '../../components/game/Run'
import Finish from '../../components/game/Finish'

class Game extends React.Component {
    state = {
        isFetching: true,
    }

    componentDidMount() {
        this.props.gameActions.cancelInvite()
        this.props.gameActions.removeRedirect()

        gameApi.get().then(response => {
            if(response.success) {
                this.props.gameActions.setGame(response.game, this.props.user._id)
                SocketController.connectGame()
            }

            this.setState({isFetching: false})
        })
    }

    render() {
        return <div className="page-block">
            {this.state.isFetching && <div className="d-flex justify-content-center loader">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>}

            {!this.state.isFetching && <>
                {this.props.game.stage === 'pick' && <Pick />}
                {this.props.game.stage === 'run' && <Run />}
                {this.props.game.stage === 'finish' && <Finish />}
            </>}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        game: state.game,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        gameActions: bindActionCreators(gameActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Game))