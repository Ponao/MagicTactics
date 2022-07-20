import React from 'react'
import gameApi from '../../apis/game'
import ReactTooltip from 'react-tooltip'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../store/actions/user'
import * as gameActions from '../../store/actions/game'
import * as skillActions from '../../store/actions/skill'
import characters from '../../characters'
import { GiPointyHat, GiBroadsword, GiGlassHeart, GiSlashedShield } from 'react-icons/gi'
import Animation from './Animation'
import icons from '../../icons'

class Character extends React.Component {
    state = {
        isPicked: false
    }

    render() {
        let animation = false

        if(this.props.type === 'my_team') {
            animation = this.props.animation.for.find(x => x.index === this.props.index && x.action === 'heal' && x.side === 'my')
            if(!animation)
                animation = this.props.animation.for.find(x => x.index === this.props.index && x.action === 'attack' && x.side === 'other')
        }

        if(this.props.type === 'enemy_team') {
            animation = this.props.animation.for.find(x => x.index === this.props.index && x.action === 'heal' && x.side === 'other')
            if(!animation)
                animation = this.props.animation.for.find(x => x.index === this.props.index && x.action === 'attack' && x.side === 'my')
        }

        return <div className={`
            character-box col 
            ${(
                this.props.type === 'enemy_team' && 
                this.props.skill.isActive && 
                this.props.skill.action === 'attack' && 
                !this.props.character.isDead
            ) ? 'red-glow-animation' : ''} 

            ${(
                this.props.type === 'my_team' && 
                this.props.skill.isActive && 
                this.props.skill.action === 'heal' && 
                !this.props.character.isDead && 
                this.props.character.hp < this.props.character.maxHp
            ) ? 'green-glow-animation' : ''}

            ${this.props.character.isDead ? 'is-dead' : ''}
        `} onClick={() => {
            let isAttackable = (this.props.type === 'enemy_team' && this.props.skill.isActive && this.props.skill.action === 'attack' && !this.props.character.isDead)
            let isHealable = (this.props.type === 'my_team' && this.props.skill.isActive && this.props.skill.action === 'heal' && !this.props.character.isDead)

            if(isAttackable || isHealable) {
                if(isHealable) {
                    if(this.props.character.hp >= this.props.character.maxHp)
                        return
                }

                gameApi.applySkill({from: this.props.skill.from, id: this.props.skill.id, to: this.props.index})
                this.props.skillActions.clearSkill()
            }
        }}>
            <img className='character-img' alt={this.props.character.name} src={Object.values(characters).find(x => x.name === this.props.character.name).img} />

            {this.props.character.class === 'warrior' && <span className='class-badge warrior'><GiBroadsword /></span>}
            {this.props.character.class === 'wizard' && <span className='class-badge wizard'><GiPointyHat /></span>}
            {this.props.character.class === 'cleric' && <span className='class-badge cleric'><GiGlassHeart /></span>}

            {this.props.character.isDefend && this.props.type === 'my_team' && <span className='skill-badge'><GiSlashedShield /></span>}

            <div className='character-values'>
                <p>HP {this.props.character.hp} / {this.props.character.maxHp}</p>
                <div className='character-value-scale'>
                    <div className='character-value-scale-value green' style={{width: `${100 / this.props.character.maxHp * this.props.character.hp}%`}} />
                </div>
            </div>

            {this.props.type === 'my_team' && this.props.user._id === this.props.game.turn && !this.props.character.isUsed && !this.props.character.isDead && <div className={`skills-box`}>
                {this.props.character.skills.map(skill => <>
                    <button 
                        data-tip=''
                        data-for={`skill-${skill.id}`}
                        className='skill-btn' 
                        key={skill.id}
                        onClick={() => {
                            if(skill.action === 'attack' || skill.action === 'heal')
                                this.props.skillActions.setSkill(this.props.index, skill.id, skill.action)

                            if(skill.action === 'defend')
                                gameApi.applySkill({from: this.props.index, id: skill.id, to: this.props.index})
                        }}
                    >
                        <img src={icons[skill.id]} alt='' />
                    </button>
                    <ReactTooltip effect='solid' id={`skill-${skill.id}`}>
                        {skill.description}
                    </ReactTooltip>
                </>)}
            </div>}

            {this.props.type === 'my_team' && this.props.skill.from === this.props.index && <div className='cancel-skill-box'>
                <button onClick={(e) => {
                    e.stopPropagation()
                    this.props.skillActions.clearSkill()
                }}>Cancel skill</button>
            </div>}

            {!!animation && <Animation animation={animation} />}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        game: state.game,
        skill: state.skill,
        animation: state.animation,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        gameActions: bindActionCreators(gameActions, dispatch),
        skillActions: bindActionCreators(skillActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Character)