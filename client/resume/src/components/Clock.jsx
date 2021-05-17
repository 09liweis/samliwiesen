import React,{useState,useEffect} from 'react';
import styled from 'styled-components';

const Dates = styled.span`
  font-size: 1em;
  margin-right: 10px;
`;

const getCurrentTime = () => {
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
  return {
    year,
    month,
    day,
    hour,
    min,
    sec,
  };
}

const Clock = () => {
  const [clock, setClock] = useState(getCurrentTime());
  const {year,month,day,hour,min,sec} = clock;
  return (
    <div>
      <Dates>{year}-{month}-{day}</Dates>
      <span>{hour} : {min} : {sec}</span>
    </div>
  );
}
export default Clock;