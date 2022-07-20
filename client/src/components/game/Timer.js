import React from 'react'
import { connect } from 'react-redux'

let interval = false

let second = 1,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24

class Timer extends React.Component {
    state = {
        timer: Math.floor((this.props.game.timer - new Date().getTime()) / 1000)
    }

    componentDidMount() {
        interval = setInterval(() => {
            this.setState({timer: Math.floor((this.props.game.timer - new Date().getTime()) / 1000)})
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(interval)
    }

    render() {
        let days = Math.floor(this.state.timer / day),
            hours = Math.floor((this.state.timer - (days * day)) / hour),
            minutes = Math.floor((this.state.timer - (days * day) - (hours * hour)) / minute),
            seconds = Math.floor((this.state.timer - (days * day) - (hours * hour) - (minutes * minute)) / second)

        minutes = minutes < 0 ? 0 : minutes
        seconds = seconds < 0 ? 0 : seconds

        hours = hours < 10 ? `0${hours}` : hours
        minutes = minutes < 10 ? `0${minutes}` : minutes
        seconds = seconds < 10 ? `0${seconds}` : seconds

        return <div className="timer-box">
            <h1 className='timer-text'>{minutes}:{seconds}</h1>

            <div className='timer-scale'>
                <div className='timer-scale-value' style={{width: `${100 / 60 * this.state.timer}%`}} />
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
    }
}

export default connect(
    mapStateToProps,
    null
)(Timer)