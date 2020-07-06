import React from 'react';
import styled from 'styled-components';
import {Box, BoxTitle, BoxBody} from './style.jsx';

const Dates = styled.span`
  font-size: 1em;
  margin-right: 10px;
`;

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '',
      month: '',
      date: '',
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
    const year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    month = month > 9 ? month: '0' + month;
    let day = new Date().getDate();
    day = day > 9 ? day : '0' + day;
    let hour = date.getHours();
    hour = hour > 9 ? hour : '0' + hour;
    let min = date.getMinutes();
    min = min > 9 ? min : '0' + min;
    let sec = date.getSeconds();
    sec = sec > 9 ? sec : '0' + sec;
    this.setState({
      year,
      month,
      day,
      hour,
      min,
      sec,
    });
  }
  componentWillUnmount() {
    if (this.intervalId) {
      delete this.intervalId;
      // this.intervalId.clearInterval();
    }
  }
  render() {
    const {year, month, day, hour, min, sec} = this.state;
    return (
      <Box className="experiences">
        <BoxTitle>
          <i className="boxIcon fa fa-clock-o" aria-hidden="true"></i>
          <span>Clock</span>
        </BoxTitle>
        <BoxBody>
          <Dates>{year}-{month}-{day}</Dates>
          <span>{hour} : {min} : {sec}</span>
        </BoxBody>
      </Box>
    );
  }
}