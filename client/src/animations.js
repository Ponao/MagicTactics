let base_attack = new Image()
base_attack.src = process.env.REACT_APP_API_URL + `/animations/base_attack.gif`

let base_heal = new Image()
base_heal.src = process.env.REACT_APP_API_URL + `/animations/base_heal.gif`

const animations = {
    base_attack: {
        src: base_attack.src,
        style: {
            width: 192*1.5,
            height: 108*1.5,
            right: '20px',
        },
        time: 600,
    },
    base_heal: {
        src: base_heal.src,
        style: {
            width: 192*1.5,
            height: 108*1.5,
            right: '-40px',
        },
        time: 800,
    },
}

export default animations