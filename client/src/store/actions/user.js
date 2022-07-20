import CookieController from '../../controllers/CookieController'
import * as StoreConstants from '../types'
import userApi from '../../apis/user'
import SocketController from '../../controllers/SocketController'

export const loginUser = (user, token) => (dispatch) => {
    CookieController.set('_token', token, 365)

    SocketController.init(token)
    
    dispatch({
        type: StoreConstants.USER_LOGIN,
        payload: user
    })
}

export const updateAvatar = (file) => (dispatch) => {
    if(file.target.files[0]) {
        let formData = new FormData()
        formData.append('avatar', file.target.files[0])

        userApi.updateAvatar(formData).then(response => {
            if(response.success) {
                dispatch({
                    type: StoreConstants.USER_UPDATE_AVATAR,
                    payload: response.avatar
                })
            }
        })
    }
}

export const removeAvatar = () => (dispatch) => {
    userApi.removeAvatar().then(response => {
        if(response.success) {
            dispatch({
                type: StoreConstants.USER_UPDATE_AVATAR,
                payload: ''
            })
        }
    })
}

export const logoutUser = () => (dispatch) => {
    CookieController.remove('_token')
    
    SocketController.disconnect()

    // setTimeout(() => {
        window.location.reload()
    // }, 300);
}