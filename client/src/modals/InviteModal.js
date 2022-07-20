import React from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as gameActions from '../store/actions/game'
import gameApi from '../apis/game'
import { Redirect } from "react-router-dom"

class InviteModal extends React.Component {
    render() {
        return <div className="modal-box">
            <div className="card-box">                
                <h2>Invation</h2>

                {this.props.game.invite.from === 'other' && <p>You have received an invitation to the game from <span>{this.props.game.invite.user.nickname}</span></p>}
                {this.props.game.invite.from === 'me' && <p>Waiting answer on invitation from <span>{this.props.game.invite.user.nickname}</span></p>}

                {this.props.game.invite.from === 'me' && <div className="spinner-border mb-3" style={{margin: '0 auto', color: '#fff'}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}

                <div className='d-flex'>
                    <button className="button sm secondary" onClick={() => {
                        gameApi.cancelInvite()
                        this.props.gameActions.cancelInvite()
                    }}>Cancel</button>
                    {this.props.game.invite.from === 'other' && <button className="button sm primary" onClick={() => {
                        gameApi.acceptInvite()
                    }}>Accept</button>}
                </div>

                {!!this.props.game.redirect && <Redirect to={`/game`} />}
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        game: state.game
    }
}

function mapDispatchToProps(dispatch) {
    return {
        gameActions: bindActionCreators(gameActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InviteModal)