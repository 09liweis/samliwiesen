import React from 'react';

import '../css/clock.css';

//deadline: new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000)

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deadline: new Date(Date.parse(new Date()) + 30 * 60 * 1000),
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0
        };
    }
    componentDidMount() {
        this.countdown();
        this.timeinterval = setInterval(() => this.countdown(), 1000);
    }
    countdown() {
        var t = this.state.deadline - Date.parse(new Date());
        var milliseconds = Math.floor((t / 1000));
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        this.setState({
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
            'milliseconds': milliseconds
        });
    }
    componentWillUnmount() {
        this.timeinterval.clearInterval();
    }
    render() {
        const {hours, minutes, seconds} = this.state;
        return (
            <div className="clock">
                <h1>Development in progress</h1>
                <h2>Remaind me to</h2>
                <input />
                <h2>in</h2>
                <div><input type="number" className="clock__input" /> hours <input type="number" className="clock__input" /> minutes</div>
                <div>{hours} hours, {minutes} minutes, {seconds} seconds</div>
            </div>
        );
    }
}