import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../store/actions/user'
import * as friendsActions from '../../store/actions/friends'
import Logo from '../../partials/Logo'
import { withRouter } from "react-router-dom"
import SimpleBar from 'simplebar-react'
import friendsApi from '../../apis/friends'
import Friend from '../../components/friends/Friend'



class Friends extends React.Component {
    state = {
        isFetching: false,
        isAdding: false,
        nickname: '',
        errors: []
    }

    componentDidMount() {
        if(!this.props.friends.getted)
            this.getFriends()
    }

    getFriends() {
        friendsApi.get().then(response => {
            if(response.success) {
                this.props.friendsActions.get(response.friends)
            }

            this.setState({isFetching: false})
        })
    }

    request() {
        if(this.state.isFetching)
            return

        this.setState({isFetching: true})

        friendsApi.request({nickname: this.state.nickname}).then(response => {
            if(response.success) {
                this.setState({isAdding: false})
                this.props.friendsActions.add(response.user)
            } else {
                this.setState({errors: response.errors})
            }

            this.setState({isFetching: false})
        })
    }

    render() {
        return <div className="page-block">
            <Logo />
            <div className="card-box" style={{height: 500}}>                
                <h2>Friends</h2>

                {!this.state.isAdding && <>
                    <SimpleBar className="scroll-list friends-list">
                        {this.props.friends.isFetching && <div className="d-flex justify-content-center loader">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>}

                        {!this.props.friends.isFetching && this.props.friends.friends.length === 0 && <div className="empty-data">
                            {/* <ForumIcon /><br/> */}
                            Add someone.
                        </div>}

                        {!this.props.friends.isFetching && <>
                            <p>Pendings</p>
                            {this.props.friends.friends.filter(x => x.status === 1).map(friend => <Friend key={friend._id} friend={friend} />)}

                            <p>Incoming</p>
                            {this.props.friends.friends.filter(x => x.status === 2).map(friend => <Friend key={friend._id} friend={friend} />)}

                            <p>Friends</p>
                            {this.props.friends.friends.filter(x => x.status === 3).map(friend => <Friend key={friend._id} friend={friend} />)}
                        </>}
                    </SimpleBar>

                    <button onClick={() => {
                        this.setState({isAdding: true})
                    }} className="button sm primary">Add</button>
                </>}

                {this.state.isAdding && <>
                    <div className="mb-2">
                        <input className="input-simple w-100" type="text" placeholder="Nickname" onChange={(e) => {
                            this.setState({nickname: e.target.value})
                        }} />
                        {this.state.errors.filter((error) => error.param === 'all').map((error, index) => <span key={index} className="error-msg">{error.msg}</span>)}
                    </div>

                    <div className='d-flex'>
                        <button className="button sm secondary" onClick={() => {
                            this.setState({isAdding: false})
                        }}>Cancel</button>
                        <button className="button sm primary" onClick={() => {
                            this.request()
                        }}>Request</button>
                    </div>
                </>}
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        friends: state.friends
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        friendsActions: bindActionCreators(friendsActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Friends))