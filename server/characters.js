const characters = {
    a: {
        name: 'Coul',
        class: 'warrior',
        hp: 800,
        maxHp: 800,
        isDefend: false,
        defend: {},
        isDead: false,
        isUsed: false,
        skills: [
            {
                name: 'Base Attack',
                id: 'base_attack',
                action: 'attack',
                type: 'ad',
                damage: 100,
                description: 'Deals 100 direct damage to an enemy.'
            },
            {
                name: 'Base Defend',
                id: 'base_defend',
                action: 'defend',
                percent: 70,
                description: 'Absorbs 70% of incoming damage next turn.'
            }
        ]
    },
    b: {
        name: 'Diark',
        class: 'warrior',
        hp: 800,
        maxHp: 800,
        isDefend: false,
        defend: {},
        isDead: false,
        isUsed: false,
        skills: [
            {
                name: 'Base Attack',
                id: 'base_attack',
                action: 'attack',
                type: 'ad',
                damage: 100,
                description: 'Deals 100 direct damage to an enemy.'
            },
            {
                name: 'Base Defend',
                id: 'base_defend',
                action: 'defend',
                percent: 70,
                description: 'Absorbs 70% of incoming damage next turn.'
            }
        ]
    },
    c: {
        name: 'Kain',
        class: 'warrior',
        hp: 800,
        maxHp: 800,
        isDefend: false,
        defend: {},
        isDead: false,
        isUsed: false,
        skills: [
            {
                name: 'Base Attack',
                id: 'base_attack',
                action: 'attack',
                type: 'ad',
                damage: 100,
                description: 'Deals 100 direct damage to an enemy.'
            },
            {
                name: 'Base Defend',
                id: 'base_defend',
                action: 'defend',
                percent: 70,
                description: 'Absorbs 70% of incoming damage next turn.'
            }
        ]
    },
    d: {
        name: 'Lori',
        class: 'warrior',
        hp: 800,
        maxHp: 800,
        isDefend: false,
        defend: {},
        isDead: false,
        isUsed: false,
        skills: [
            {
                name: 'Base Attack',
                id: 'base_attack',
                action: 'attack',
                type: 'ad',
                damage: 100,
                description: 'Deals 100 direct damage to an enemy.'
            },
            {
                name: 'Base Defend',
                id: 'base_defend',
                action: 'defend',
                percent: 70,
                description: 'Absorbs 70% of incoming damage next turn.'
            }
        ]
    },
    e: {
        name: 'Deth',
        class: 'wizard',
        hp: 600,
        maxHp: 600,
        isDefend: false,
        defend: {},
        isDead: false,
        isUsed: false,
        skills: [
            {
                name: 'Base Attack',
                id: 'base_attack',
                action: 'attack',
                type: 'ad',
                damage: 150,
                description: 'Deals 150 direct damage to an enemy.'
            },
            {
                name: 'Base Defend',
                id: 'base_defend',
                action: 'defend',
                percent: 50,
                description: 'Absorbs 50% of incoming damage next turn.'
            }
        ]
    },
    f: {
        name: 'Godwin',
        class: 'wizard',
        hp: 600,
        maxHp: 600,
        isDefend: false,
        defend: {},
        isDead: false,
        isUsed: false,
        skills: [
            {
                name: 'Base Attack',
                id: 'base_attack',
                action: 'attack',
                type: 'ad',
                damage: 150,
                description: 'Deals 150 direct damage to an enemy.'
            },
            {
                name: 'Base Defend',
                id: 'base_defend',
                action: 'defend',
                percent: 50,
                description: 'Absorbs 50% of incoming damage next turn.'
            }
        ]
    },
    g: {
        name: 'Morgana',
        class: 'wizard',
        hp: 600,
        maxHp: 600,
        isDefend: false,
        defend: {},
        isDead: false,
        isUsed: false,
        skills: [
            {
                name: 'Base Attack',
                id: 'base_attack',
                action: 'attack',
                type: 'ad',
                damage: 150,
                description: 'Deals 150 direct damage to an enemy.'
            },
            {
                name: 'Base Defend',
                id: 'base_defend',
                action: 'defend',
                percent: 50,
                description: 'Absorbs 50% of incoming damage next turn.'
            }
        ]
    },
    h: {
        name: 'Prince Azazel',
        class: 'wizard',
        hp: 600,
        maxHp: 600,
        isDefend: false,
        defend: {},
        isDead: false,
        isUsed: false,
        skills: [
            {
                name: 'Base Attack',
                id: 'base_attack',
                action: 'attack',
                type: 'ad',
                damage: 150,
                description: 'Deals 150 direct damage to an enemy.'
            },
            {
                name: 'Base Defend',
                id: 'base_defend',
                action: 'defend',
                percent: 50,
                description: 'Absorbs 50% of incoming damage next turn.'
            }
        ]
    },
    i: {
        name: 'Meredit',
        class: 'cleric',
        hp: 550,
        maxHp: 550,
        isDefend: false,
        defend: {},
        isDead: false,
        isUsed: false,
        skills: [
            {
                name: 'Base Heal',
                id: 'base_heal',
                action: 'heal',
                recovery: 200,
                description: 'Restores 200 HP to an ally.'
            },
            {
                name: 'Base Defend',
                id: 'base_defend',
                action: 'defend',
                percent: 60,
                description: 'Absorbs 60% of incoming damage next turn.'
            }
        ]
    },
    j: {
        name: 'Perlit',
        class: 'cleric',
        hp: 550,
        maxHp: 550,
        isDefend: false,
        defend: {},
        isUsed: false,
        isDead: false,
        skills: [
            {
                name: 'Base Heal',
                id: 'base_heal',
                action: 'heal',
                recovery: 200,
                description: 'Restores 200 HP to an ally.'
            },
            {
                name: 'Base Defend',
                id: 'base_defend',
                action: 'defend',
                percent: 60,
                description: 'Absorbs 60% of incoming damage next turn.'
            }
        ]
    },
}

module.exports = characters