import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../store/actions/user'
import { Link, withRouter } from "react-router-dom"
import Logo from '../../partials/Logo'

class Main extends React.Component {
    render() {
        return <div className="page-block">
            <Logo />

            <Link className="button primary mb-3" to="/login">Sign in</Link>
            <Link className="button secondary" to="/register">Sign up</Link>
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
)(withRouter(Main))