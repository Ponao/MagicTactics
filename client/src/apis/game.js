import { handleError, handleSuccess } from "."
import CookieController from "../controllers/CookieController"

let apiUrl = `${process.env.REACT_APP_API_URL}/api/game/`

const apis = {
    get: function(_id) {
        return fetch(`${apiUrl}get?gameId=${_id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CookieController.get('_token')}`
            }
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('game api "get" error:', e)
            return handleError()
        })
    },
    invite: function(params) {
        return fetch(`${apiUrl}invite`, {
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
            console.error('game api "invite" error:', e)
            return handleError()
        })
    },
    cancelInvite: function() {
        return fetch(`${apiUrl}cancel-invite`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CookieController.get('_token')}`
            },
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('game api "cancelInvite" error:', e)
            return handleError()
        })
    },
    acceptInvite: function() {
        return fetch(`${apiUrl}accept-invite`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CookieController.get('_token')}`
            },
        })
        .then(handleSuccess)
        .catch(e => {
            console.error('game api "acceptInvite" error:', e)
            return handleError()
        })
    },
    pickTeam: function(params) {
        return fetch(`${apiUrl}pick-team`, {
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
            console.error('game api "pickTeam" error:', e)
            return handleError()
        })
    },
    applySkill: function(params) {
        return fetch(`${apiUrl}apply-skill`, {
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
            console.error('game api "applySkill" error:', e)
            return handleError()
        })
    },
}

export default apis