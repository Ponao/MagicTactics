const characters = require("../characters")

const SkillController = {
    applySkill: (myTeam, enemyTeam, from, id, to, gameId) => {
        let isValidSkill = !!myTeam.pick[from] && myTeam.pick[from].skills.find(x => x.id === id)
        let isValidTarget = !!enemyTeam.pick[to]

        if(!isValidSkill || !isValidTarget) {
            return {success: false}
        }

        let isUsed = myTeam.pick[from].isUsed

        if(isUsed) {
            return {success: false}
        }

        let picks = SkillController[id](myTeam, enemyTeam, from, id, to)

        let action = isValidSkill.action

        if(picks === false) {
            return {success: false}
        }

        return {picks, success: true, action}
    },
    base_attack: (myTeam, enemyTeam, from, id, to) => {
        let fromWho = myTeam.pick[from]
        let forWho = enemyTeam.pick[to]

        if(fromWho.isDead || forWho.isDead) {
            return false
        }

        myTeam.pick[from].isUsed = true

        let skill = {...myTeam.pick[from].skills.find(x => x.id === id)}
        
        enemyTeam = {...enemyTeam, pick: enemyTeam.pick.map((t, index) => {
            if(index !== to)
                return t

            if(t.isDefend) {
                skill.damage = skill.damage - (skill.damage / 100 * t.defend.percent)
            }

            let hp = t.hp - skill.damage

            if(hp < 0) {
                hp = 0
            }

            let isDead = hp === 0

            return {...t, hp, isDead, isDefend: false, defend: {}}
        })}

        return [myTeam, enemyTeam]
    },
    base_heal: (myTeam, enemyTeam, from, id, to) => {
        let fromWho = myTeam.pick[from]
        let forWho = myTeam.pick[to]

        if(fromWho.isDead || forWho.isDead) {
            return false
        }

        if(forWho.hp >= forWho.maxHp) {
            return false
        }

        myTeam.pick[from].isUsed = true

        let skill = {...myTeam.pick[from].skills.find(x => x.id === id)}
        
        myTeam = {...myTeam, pick: myTeam.pick.map((t, index) => {
            if(index !== to)
                return t

            let hp = t.hp + skill.recovery

            if(hp > t.maxHp)
                hp = t.maxHp

            return {...t, hp}
        })}

        return [myTeam, enemyTeam]
    },
    base_defend: (myTeam, enemyTeam, from, id, to) => {
        if(from !== to)
            return false 

        let target = myTeam.pick[from]

        if(target.isDead || target.isDefend) {
            return false
        }

        myTeam.pick[from].isUsed = true

        let skill = myTeam.pick[from].skills.find(x => x.id === id)
        
        myTeam = {...myTeam, pick: myTeam.pick.map((t, index) => {
            if(index !== to)
                return t            

            return {...t, isDefend: true, defend: {type: skill.type, percent: skill.percent}}
        })}

        return [myTeam, enemyTeam]
    },
    clear_defend: async (gameId) => {
        // let game
        // myTeam = myTeam.map(t => ({...t, isDefend: false, defend: {}}))
        // enemyTeam = enemyTeam.map(t => ({...t, isDefend: false, defend: {}}))

        // return [myTeam, enemyTeam]
    },
}

module.exports = SkillController