import React from "react";
// Router
import { Switch, Route, Redirect, withRouter } from "react-router-dom"
import routes from './config'

// Redux
import { connect } from "react-redux"
import * as userActions from "../store/actions/user"
import { bindActionCreators } from "redux"
 
// Other functions
import { setTitle } from "../controllers/FunctionsController"
import CookieController from "../controllers/CookieController"
import userApi from "../apis/user"

class AppRouter extends React.Component {
    state = {
        isRender: false
    }

    componentDidUpdate() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    componentDidMount() {
        this.props.history.listen(() => {
            setTitle(this.props.history.location.pathname, routes)
        })
        
        setTitle(this.props.history.location.pathname, routes)

        let _token = CookieController.get('_token')
        
        if(_token) {
            userApi.me().then(({user, success}) => {
                if(success) {
                    this.props.userActions.loginUser(user, _token)
                    this.setState({isRender: true})
                } else {
                    this.setState({isRender: true})
                }
            })
        } else {
            this.setState({isRender: true})
        }
    }

    render() {
        return this.state.isRender && (<>
            <Switch>
                {routes.map((route, index) => {
                    switch (route.type) {
                        case 'auth':
                            return <this.AuthRoute
                                key={index}
                                path={route.path}
                                exact={route.exact}
                            >
                                <route.component />
                            </this.AuthRoute>
                        case 'all':
                            return <this.AllRoute
                                key={index}
                                path={route.path}
                                exact={route.exact}
                            >
                                <route.component />
                            </this.AllRoute>
                        case 'user':
                            return <this.UserRoute
                                key={index}
                                path={route.path}
                                exact={route.exact}
                            >
                                <route.component />
                            </this.UserRoute>
                        default:
                            return false
                    }            
                })}

                <Route component={() =>
                    <Redirect
                        to={{
                            pathname: "/",
                        }}
                    />
                } />
            </Switch>
        </>)
    }

    AllRoute = ({ children, ...rest }) => {
        return (
            <Route
                {...rest}
                render={() =>
                    (
                        children
                    )
                }
            />
        )
    }

    AuthRoute = ({ children, ...rest }) => {
        return (
            <Route
                {...rest}
                render={() =>
                    !this.props.user.isAuth ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/friends",
                            }}
                        />
                    )
                }
            />
        )
    }

    UserRoute = ({ children, ...rest }) => {
        return (
            <Route
                {...rest}
                render={() =>
                    this.props.user.isAuth ? 
                        // this.props.user.isConfirmed ? 
                                    (children)
                    : (
                        <Redirect
                            to={{
                                pathname: "/login",
                            }}
                        />
                    )
                }
            />
        )
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
)(withRouter(AppRouter))
