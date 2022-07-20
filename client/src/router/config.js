import React from 'react'

import Main from '../pages/user/Main'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

import Friends from '../pages/user/Friends'
import Game from '../pages/user/Game'

const routes = [
    {
        path: '/',
        exact: true,
        type: 'auth',
        title: `Home - ${process.env.REACT_APP_NAME}`,
        component: () => <Main />
    },
    {
        path: '/login',
        exact: false,
        type: 'auth',
        title: `Login - ${process.env.REACT_APP_NAME}`,
        component: () => <Login />
    },
    {
        path: '/register',
        exact: false,
        type: 'auth',
        title: `Register - ${process.env.REACT_APP_NAME}`,
        component: () => <Register />
    },
    {
        path: '/friends',
        exact: false,
        type: 'user',
        title: `Friends - ${process.env.REACT_APP_NAME}`,
        component: () => <Friends />
    },
    {
        path: '/game',
        exact: false,
        type: 'user',
        title: `Game - ${process.env.REACT_APP_NAME}`,
        component: () => <Game />
    },
]

export default routes