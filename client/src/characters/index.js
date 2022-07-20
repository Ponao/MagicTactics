import A_IMG from './Coul-DD.png'
import B_IMG from './Diark-DD.png'
import C_IMG from './Kain-DD.png'
import D_IMG from './Lori-DD.png'
import E_IMG from './Deth-Mag.png'
import F_IMG from './Godwin-Mag.png'
import G_IMG from './Morgana-Mag.png'
import H_IMG from './PrinceAzazel-Mag.png'
import I_IMG from './Meredit-Heal.png'
import J_IMG from './Perlit-Heal.png'

const characters = {
    a: {
        name: 'Coul',
        class: 'warrior',
        img: A_IMG,
        hp: 750,
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
        img: B_IMG,
        hp: 800,
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
        img: C_IMG,
        hp: 500,
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
        img: D_IMG,
        hp: 600,
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
        img: E_IMG,
        hp: 400,
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
        img: F_IMG,
        hp: 320,
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
        img: G_IMG,
        hp: 450,
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
        img: H_IMG,
        hp: 550,
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
        img: I_IMG,
        hp: 600,
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
        img: J_IMG,
        hp: 600,
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

export default characters