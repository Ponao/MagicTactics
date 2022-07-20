import React from "react";
import { withRouter, Link, NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import * as userActions from '../store/actions/user'

class Header extends React.Component {
    render() {
        return <div className="header">    
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-auto logo" onClick={() => {
                        this.props.history.push('/')
                    }}>
                        {/* <img src={logo} alt="TheTutor - learn all what you want." /> */}
                        Magic Tactics
                    </div>

                    <div className="col" />

                    <div className="col-auto menu">
                        {!this.props.user.isAuth && <>
                            <Link className="button btn-filled" to="/register">Sign Up</Link>
                            <Link className="button btn-empty" to="/login">Sign in</Link>
                        </>}

                        {this.props.user.isAuth && <>
                            <Link className="button btn-filled" to="/friends">Friends</Link>
                            <Link className="button btn-empty" to="/login">Log out</Link>
                        </>}
                    </div>

                    <div className="col-auto">
                        <div className="menu-toggle" onClick={() => {
                            this.setState({mbOpen: true})
                        }}>
                            <span className="sq-1"></span>
                            <span className="sq-2"></span>
                            <span className="sq-3"></span>
                            <span className="sq-4"></span>
                        </div>
                    </div>
                </div>
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