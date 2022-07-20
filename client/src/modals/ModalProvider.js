import React from "react"
import { connect } from 'react-redux'
import InviteModal from "./InviteModal"

class ModalProvider extends React.Component {
    render() {
        return this.props.user.isAuth && <>
            {!!this.props.game.invite.from && <InviteModal />}
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
        user: state.user,
    }
}

export default connect(
    mapStateToProps,
    null
)(ModalProvider)