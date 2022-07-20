import React from 'react'
import authApi from '../../apis/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../store/actions/user'
import { withRouter } from "react-router-dom"
import Logo from '../../partials/Logo'

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errors: [],
        isFetching: false
    }

    submit = (e) => {
        e.preventDefault();

        if(this.state.isFetching)
            return
        
        this.setState({isFetching: true})

        authApi.login({
            email: this.state.email.toLowerCase().replace(/\s+/g, ''),
            password: this.state.password
        }).then(response => {
            if(response.success) {
                this.props.userActions.loginUser(response.user, response.token)
                this.props.history.push('/confirm')
            } else {
                this.setState({errors: response.errors})
            }

            this.setState({isFetching: false})
        })
    }

    render() {
        return <div className="page-block">
            <Logo />

            <div className="card-box">
                {this.state.isFetching && <div className="d-flex justify-content-center loader">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}
                
                <h2>Sign in</h2>
                
                <form onSubmit={this.submit}>
                    <div className="mb-2">
                        <input className="input-simple w-100" type="text" placeholder="Email" onChange={(e) => {
                            this.setState({email: e.target.value})
                        }} />
                        {this.state.errors.filter((error) => error.param === 'email').map((error, index) => <span key={index} className="error-msg">{error.msg}</span>)}
                    </div>

                    <div className="mb-2">
                        <input className="input-simple w-100" type="password" placeholder="Password" onChange={(e) => {
                            this.setState({password: e.target.value})
                        }} />
                        {this.state.errors.filter((error) => error.param === 'password').map((error, index) => <span key={index} className="error-msg">{error.msg}</span>)}
                    </div>

                    {this.state.errors.filter((error) => error.param === 'all').map((error, index) => <span key={index} className="error-msg">{error.msg}</span>)}

                    <button className="button sm secondary" type="submit">Sign in</button>

                    {/* <div className="forgot-link" onClick={() => {
                        this.props.history.push('/forgot')
                    }}>Forgot password?</div>

                    <div className="add-link">Don't have an account yet? <span onClick={() => {
                        this.props.history.push('/register')
                    }}>SignUp</span></div> */}
                </form>
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
)(withRouter(Login))