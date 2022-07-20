import { handleError, handleSuccess } from "."
import CookieController from "../controllers/CookieController"

let apiUrl = `${process.env.REACT_APP_API_URL}/api/user/`

const apis = {
    me: function() {
        return fetch(`${apiUrl}me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CookieController.get('_token')}`
            }
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('user api "me" error:', e)
            return handleError()
        })
    },
    admit: function(formData) {
        return fetch(`${apiUrl}admit`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CookieController.get('_token')}`
            },
            body: formData
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('user api "admit" error:', e)
            return handleError()
        })
    },
    setSchedule: function(params) {
        return fetch(`${apiUrl}set-schedule`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CookieController.get('_token')}`
            },
            body: JSON.stringify(params)
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('user api "setSchedule" error:', e)
            return handleError()
        })
    },
    setConfLessons: function(params) {
        return fetch(`${apiUrl}set-conf-lessons`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CookieController.get('_token')}`
            },
            body: JSON.stringify(params)
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('user api "setConfLessons" error:', e)
            return handleError()
        })
    },
    getUser: function(params) {
        return fetch(`${apiUrl}${params._id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('user api "getUser" error:', e)
            return handleError()
        })
    },
    getOnline: function(params) {
        return fetch(`${apiUrl}get-online/${params._id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CookieController.get('_token')}`
            }
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('user api "getOnline" error:', e)
            return handleError()
        })
    },
    updateDesription: function(params) {
        return fetch(`${apiUrl}update-description`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CookieController.get('_token')}`
            },
            body: JSON.stringify(params)
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('user api "updateDesription" error:', e)
            return handleError()
        })
    },
    updateAvatar: function(formData) {
        return fetch(`${apiUrl}update-avatar`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CookieController.get('_token')}`
            },
            body: formData
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('user api "updateAvatar" error:', e)
            return handleError()
        })
    },
    removeAvatar: function(formData) {
        return fetch(`${apiUrl}remove-avatar`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${CookieController.get('_token')}`
            },
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('user api "removeAvatar" error:', e)
            return handleError()
        })
    },
    createProfile: function(params) {
        return fetch(`${apiUrl}create-profile`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CookieController.get('_token')}`
            },
            body: JSON.stringify(params)
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('user api "createProfile" error:', e)
            return handleError()
        })
    },
    editProfile: function(params) {
        return fetch(`${apiUrl}edit-profile`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CookieController.get('_token')}`
            },
            body: JSON.stringify(params)
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('user api "editProfile" error:', e)
            return handleError()
        })
    },
}

export default apis