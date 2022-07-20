import React from 'react'
import friendsApi from '../../apis/friends'
import gameApi from '../../apis/game'
import Avatar from '../../components/user/Avatar'
import { Play, UserPlus, UserX } from 'react-feather'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as friendsActions from '../../store/actions/friends'
import * as gameActions from '../../store/actions/game'
import { toast } from 'react-toastify'

class Friend extends React.Component {
    render() {
        return <div className='friend-box'>
            <Avatar user={this.props.friend.recipient} size={40} />

            <h4>{this.props.friend.recipient.nickname}</h4>

            <div className='col'></div>

            {this.props.friend.status === 3 && <button className='action purple' onClick={() => {
                gameApi.invite({_id: this.props.friend.recipient._id}).then(response => {
                    if(response.success) {
                        this.props.gameActions.invite(this.props.friend.recipient)
                    } else {
                        response.errors.map(err => toast.error(err.msg))
                        
                    }
                })
            }}><Play /></button>}

            {this.props.friend.status === 2 && <button className='action green' onClick={() => {
                friendsApi.accept({_id: this.props.friend.recipient._id})

                this.props.friendsActions.update(this.props.friend.recipient._id, 3)
            }}><UserPlus /></button>}

            <button className='action red' onClick={() => {
                friendsApi.remove({_id: this.props.friend.recipient._id})
                
                if(this.props.friend.status === 3) {
                    this.props.friendsActions.update(this.props.friend.recipient._id, 2)
                }

                if(this.props.friend.status === 2 || this.props.friend.status === 1) {
                    this.props.friendsActions.remove(this.props.friend.recipient._id)
                }
            }}><UserX /></button>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        friends: state.friends
    }
}

function mapDispatchToProps(dispatch) {
    return {
        friendsActions: bindActionCreators(friendsActions, dispatch),
        gameActions: bindActionCreators(gameActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Friend)