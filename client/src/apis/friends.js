import { handleError, handleSuccess } from "."
import CookieController from "../controllers/CookieController"

let apiUrl = `${process.env.REACT_APP_API_URL}/api/friends/`

const apis = {
    get: function() {
        return fetch(`${apiUrl}get`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CookieController.get('_token')}`
            }
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('friends api "get" error:', e)
            return handleError()
        })
    },
    request: function(params) {
        return fetch(`${apiUrl}request`, {
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
            console.error('friends api "request" error:', e)
            return handleError()
        })
    },
    accept: function(params) {
        return fetch(`${apiUrl}accept`, {
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
            console.error('friends api "accept" error:', e)
            return handleError()
        })
    },
    remove: function(params) {
        return fetch(`${apiUrl}remove`, {
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
            console.error('friends api "remove" error:', e)
            return handleError()
        })
    },
}

export default apis