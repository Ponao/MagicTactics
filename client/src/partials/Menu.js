import React from "react";
import { withRouter, Link } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as userActions from '../store/actions/user'

import { Menu, Users, Settings, LogOut, X } from 'react-feather'

class Header extends React.Component {
    state = {
        isOpened: false
    }

    toggleMenu() {
        this.setState({isOpened: !this.state.isOpened})
    }

    render() {
        return this.props.user.isAuth && <div className="menu">    
            <button className="toggle" onClick={() => {
                this.toggleMenu()
            }}>
                {!this.state.isOpened && <Menu size={40} />}
                {this.state.isOpened && <X size={40} />}
            </button>

            <div className={`menu-list ${this.state.isOpened ? 'show' : 'hide'}`}>
                <Link to='/friends' onClick={() => {
                    this.toggleMenu()
                }}><Users size={40} /></Link>

                <Link to='/settings' onClick={() => {
                    this.toggleMenu()
                }}><Settings size={40} /></Link>

                <Link to='' onClick={(e) => {
                    this.toggleMenu()
                    e.preventDefault()
                    this.props.userActions.logoutUser()
                }}><LogOut color="#ED4242" size={40} /></Link>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Header))