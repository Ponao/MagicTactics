import React from 'react'
import gameApi from '../../apis/game'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../store/actions/user'
import * as gameActions from '../../store/actions/game'
import { withRouter } from "react-router-dom"
import characters from '../../characters'
import { GiPointyHat, GiBroadsword, GiGlassHeart } from 'react-icons/gi'
import { Check } from 'react-feather'
import Timer from './Timer'

class Character extends React.Component {
    state = {
        isPicked: false
    }

    render() {
        return <div className='character-box col' onClick={() => {
            let isChanged = this.props.onPick()

            if(isChanged)
                this.setState({isPicked: !this.state.isPicked})
        }}>
            <img className='character-img' alt={this.props.character.name} src={this.props.character.img} />

            {this.props.character.class === 'warrior' && <span className='class-badge warrior'><GiBroadsword /></span>}
            {this.props.character.class === 'wizard' && <span className='class-badge wizard'><GiPointyHat /></span>}
            {this.props.character.class === 'cleric' && <span className='class-badge cleric'><GiGlassHeart /></span>}

            <div className={`picked-box ${this.state.isPicked ? 'show' : 'hide'}`}>
                {this.props.character.class === 'warrior' && <span className='warrior'><Check size={44} /></span>}
                {this.props.character.class === 'wizard' && <span className='wizard'><Check size={44} /></span>}
                {this.props.character.class === 'cleric' && <span className='cleric'><Check size={44} /></span>}
            </div>
        </div>
    }
}

class Pick extends React.Component {
    state = {
        pick: []
    }

    confirmPick() {
        gameApi.pickTeam({pick: this.state.pick}).then(response => {

        })
    }

    onPick(key) {
        if(this.state.pick.find(x => x === key)) {
            this.setState({pick: this.state.pick.filter(x => x !== key)})
            return true
        } else {
            if(this.state.pick.length < 5) {
                this.setState({pick: [...this.state.pick, key]})
                return true
            }
        }

        return false
    }

    render() {
        return <div className="page-block">
            <h1 className='game-title'>Pick your team</h1>

            <div className='characters-box'>
                {Object.keys(characters).map((key) => <Character onPick={() => {
                    return this.onPick(key)
                }} key={key} character={characters[key]} />)}
            </div>

            <Timer />

            <button className='button primary' onClick={() => this.confirmPick()}>Confirm pick</button>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        game: state.game,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        gameActions: bindActionCreators(gameActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Pick))