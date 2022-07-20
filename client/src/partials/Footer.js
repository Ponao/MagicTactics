import React from "react";
import { withRouter, Link } from "react-router-dom"
import { connect } from 'react-redux'
import logo from '../assets/images/Logo.svg'
import '../assets/styles/partials/footer.css'
import { bindActionCreators } from "redux";
import * as userActions from '../store/actions/user'
import paypalLogo from '../assets/images/paypal.svg'
import visaLogo from '../assets/images/Visa.svg'
import mastercardLogo from '../assets/images/MasterCard.svg'

class Footer extends React.Component {
    render() {
        return <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 footer-logo">
                        <img className="logo mb-4" src={logo} />
                        <div><a href="https://www.facebook.com/thetutordotlink" target="_blank">Like Our Facebook Page For Updates!</a></div>
                        <div><a href="https://www.facebook.com/groups/thetutor.link/" target="_blank">Join Our Facebook Group For Discussions!</a></div>
                     

                        
                    </div>

                    {/* <div className="col" /> */}
                    <div className="col-md-3">
                        <div className="box">
                            <h5 className="mb-4">RESOURCES</h5>
                            <div className="col menu add-menu">
                                <a href="https://thetutor.link/" target="_blank">Blog</a>
                                <a href="tel:02039849999">Call us</a>
                                <Link to="/contact">Contact</Link>
                                <Link to="/about">About</Link>
                            </div>

                            {/* <a href="https://thetutor.link" target="_blank">Blog</a> */}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="box">
                            <h5>SUPPORT</h5>

                            {/* <a href="/">Faq</a> */}
                            <Link to="/privacy">Terms and Conditions</Link>
                            <Link to="/faq">FAQ</Link>
                            <a href="tel:02039849999">0203 984 9999</a>
                        </div>
                        
                        
                    </div>
                    <div className="col-md-3 ">
                        {/* <div className="box">
                            <h5>COMPANY</h5>
                    
                            <a href="https://goo.gl/maps/xhuM1EUPSprFNMCJ8">
                                17 Gainsborough Road<br/>
                                Reading
                                Berkshire
                                RG30 3DB
                            </a>
                        </div> */}

                        <div className="box">
                            <h5>FOR ENQUIRIES</h5>

                            <a href="mailto:media@thetutor.link">media@thetutor.link</a>
                            <div className="socials-links">
                                <a href="https://www.facebook.com/thetutordotlink" target="_blank" >
                                    <i className="fa fa-facebook-square fa-2x" aria-hidden="true"></i>
                                </a>
                                <a href="https://www.instagram.com/thetutor.link/" target="_blank" >
                                <i className="fa fa-instagram fa-2x" aria-hidden="true"></i>
                                </a>
                                <a href="https://www.pinterest.co.uk/thetutorlink/" target="_blank" >
                                    <i className="fa fa-pinterest-square fa-2x" aria-hidden="true"></i>
                                </a>
                                <a href="https://twitter.com/TheTutorDotLink" target="_blank" >
                                    <i className="fa fa-twitter-square fa-2x" aria-hidden="true"></i>
                                   
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="box text-center">
                            
                            <span>
                                <img className="payment-logo" src={mastercardLogo} />
                                <img className="payment-logo" style={{marginLeft: 10}} src={paypalLogo} />
                                <img className="payment-logo" style={{height: 18, marginLeft: 10}} src={visaLogo} />
                            </span>
                    </div>
                </div>
                <div className="row text-center">
                    <div>© THETUTOR International Ltd.</div>
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
)(withRouter(Footer))