let base_attack = new Image()
base_attack.src = process.env.REACT_APP_API_URL + `/icons/base_attack.jpg`

let base_heal = new Image()
base_heal.src = process.env.REACT_APP_API_URL + `/icons/base_heal.jpg`

let base_defend = new Image()
base_defend.src = process.env.REACT_APP_API_URL + `/icons/base_defend.jpg`

const icons = {
    base_attack: base_attack.src,
    base_heal: base_heal.src,
    base_defend: base_defend.src,
}

export default icons