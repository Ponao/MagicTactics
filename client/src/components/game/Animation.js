import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as animationActions from '../../store/actions/animation'
import animations from '../../animations'

class Animation extends React.Component {
    state = {
        isPicked: false
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.animationActions.removeAnimation(this.props.animation.index, this.props.animation.side)
        }, animations[this.props.animation.id].time)
    }

    render() {
        return <div className='animation-box' style={animations[this.props.animation.id].style}>
            <img src={animations[this.props.animation.id].src} alt='' />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        skill: state.skill,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        animationActions: bindActionCreators(animationActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Animation)