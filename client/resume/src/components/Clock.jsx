import React from 'react';
import styled from 'styled-components';

const Dates = styled.span`
    font-size: 1em;
    margin-right: 10px;
`;

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            date: new Date().getDate(),
            hour: '',
            min: '',
            sec: ''
            
        };
    }
    componentDidMount() {
        this.tick();
        this.intervalId = setInterval(
            () => this.tick(), 1000
        );
    }
    tick() {
        const date = new Date();
        const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
        const min = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
        const sec = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
        this.setState({
            hour: hour,
            min: min,
            sec: sec
        });
    }
    componentWillUnmount() {
        this.intervalId.clearInterval();
    }
    render() {
        const {year, month, date, hour, min, sec} = this.state;
        return (
            <section>
                <i className="fa fa-clock-o" aria-hidden="true"></i>
                <Dates>{year}-{month > 9 ? month: '0' + month}-{date > 9 ? date : '0' + date}</Dates>
                <span>{hour} : {min} : {sec}</span>
            </section>
        );
    }
}