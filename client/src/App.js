import React from 'react'
import 'simplebar/dist/simplebar.min.css';
import ModalProvider from './modals/ModalProvider';
import Menu from './partials/Menu';
import AppRouter from './router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
    render() {
        return <>
            <Menu />
            <AppRouter />

            <ModalProvider />
            <ToastContainer position='top-center' />
        </>
    }
}

export default App