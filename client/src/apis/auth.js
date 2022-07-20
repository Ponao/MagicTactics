import { handleError, handleSuccess } from "."
import CookieController from "../controllers/CookieController"

let apiUrl = `${process.env.REACT_APP_API_URL}/api/auth/`

const apis = {
    login: function(params) {
        return fetch(`${apiUrl}login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('auth api "login" error:', e)
            return handleError()
        })
    },
    register: function(params) {
        return fetch(`${apiUrl}register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('auth api "register" error:', e)
            return handleError()
        })
    },
    forgot: function(params) {
        return fetch(`${apiUrl}forgot`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('auth api "forgot" error:', e)
            return handleError()
        })
    },
    reset: function(params) {
        return fetch(`${apiUrl}reset`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('auth api "reset" error:', e)
            return handleError()
        })
    },
    confirm: function(params) {
        return fetch(`${apiUrl}confirm`, {
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
            console.error('auth api "confirm" error:', e)
            return handleError()
        })
    },
    resend: function(params) {
        return fetch(`${apiUrl}resend`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CookieController.get('_token')}`
            }
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('auth api "resend" error:', e)
            return handleError()
        })
    },
}

export default apis