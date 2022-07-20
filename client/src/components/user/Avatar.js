import React from 'react'

class Avatar extends React.Component {
    render() {
        return <div className="avatar" style={{width: this.props.size, minWidth: this.props.size, height: this.props.size}}>
            {/* {!!this.props.user.avatar.length && <img alt={this.props.user.nickname} src={this.props.user.avatar} style={{background: `rgb(${this.props.user.color})`}} />} */}
            {/* {!this.props.user.avatar.length &&  */}
            <div className="avatar-name" style={{background: `rgb(${this.props.user.color})`, fontSize: this.props.size/2.5}}>
                {this.props.user.nickname[0]}
            </div>
            {/* } */}
            
            {this.props.isOnline && <span className="online-status"></span>}
        </div>
    }
}

export default Avatar