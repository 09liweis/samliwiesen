import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Box, BoxTitle, BoxBody} from './style.jsx';

const WeatherDesc = styled.div`
  font-weight:bold;
  text-transform:capitalize;
  font-size:20px;
`;
const WeatherWrapper = styled.section`
  position:relative;
`;
const WeatherIcon = styled.img`
  position:absolute;
  top: -10px;
  right: -5px;
`;
const api = 'https://api.openweathermap.org/data/2.5/weather';
export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lon:'',
      city: '',
      temp: '',
      temp_min:'',
      temp_max:'',
      feels_like:'',
      description:'',
      icon: '',
      country:'',
      sunset:'',
      sunrise:'',
      loading: true
    };
  }
  componentDidMount() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        this.fetchWeather(this.state.lat, this.state.lon);
      });
    } else {
      this.setState({loading:false});
    }
  }
  sun2Time(timestamp) {
    const date = new Date(timestamp*1000);
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    hour = hour > 9 ? hour : '0' + hour;
    min = min > 9 ? min : '0' + min;
    sec = sec > 9 ? sec : '0' + sec;
    return `${hour}:${min}:${sec}`;
  }
  fetchWeather(lat, lon) {
    axios.get(api, {
      params: {
        appid: '323b480b81057a727bed54d9532159d6',
        lat: lat,
        lon: lon,
        units: 'metric'
      }
    })
    .then((res) => {
      const data = res.data;
      const main = data.main;
      const weather = data.weather[0];
      const sys = data.sys;
      this.setState({
        sunrise:this.sun2Time(sys.sunrise),
        sunset:this.sun2Time(sys.sunset),
        description:weather.description,
        feels_like:Math.floor(main.feels_like),
        city: data.name,
        temp: Math.floor(main.temp),
        temp_min:Math.floor(main.temp_min),
        temp_max:Math.floor(main.temp_max),
        country:sys.country,
        icon: 'https://openweathermap.org/img/w/' + weather.icon + '.png',
        loading: false
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  componentWillUnmount() {
  }
  render() {
    const {sunset,sunrise,country,loading,temp,temp_min,temp_max,city,icon,feels_like,description} = this.state;
    return (
      <Box className="weather">
        <BoxTitle bgColor={'#9d1024'}>
          <i className="boxIcon fa fa-map-marker" aria-hidden="true"></i>
          <span>Weather</span>
        </BoxTitle>
        <BoxBody>
          {loading ?
          <i className="fa fa-spinner loading" aria-hidden="true"></i>
          :
          <WeatherWrapper>
            <WeatherIcon src={icon}/>
            <WeatherDesc>{description}</WeatherDesc>
            <div><span style={{'fontSize':'30px'}}>{temp} <sup>o</sup></span> <span>{city}, {country}</span></div>
            <div>{temp_max}<sup>o</sup>/{temp_min}<sup>o</sup> Feels like {feels_like} <sup>o</sup>C</div>
            <div>Sun: {sunrise}/{sunset}</div>
          </WeatherWrapper>
          }
        </BoxBody>
      </Box>
    );
  }
}