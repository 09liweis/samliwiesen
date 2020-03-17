import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Box, BoxTitle, BoxBody} from './style.jsx';

const InfoContainer = styled.div`
	display:flex;
	align-items:center;
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
		}
	}
	sun2Time(timestamp) {
		const date = new Date(timestamp*1000);
		const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
		const min = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
		const sec = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
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
				<BoxTitle>
					<i className="boxIcon fa fa-map-marker" aria-hidden="true"></i>
					<span>Weather</span>
				</BoxTitle>
				<BoxBody>
					{loading ?
					<i className="fa fa-spinner loading" aria-hidden="true"></i>
					:
					<InfoContainer>
						<div>
							<img src={icon}/>
							<div>{temp} <sup>o</sup>C</div>
						</div>
						<div>
							<div>{city}, {country}</div>
							<div>{description}</div>
							<div>{temp_max}<sup>o</sup>/{temp_min}<sup>o</sup> Feels like {feels_like} <sup>o</sup>C</div>
							<div>Sun rise:{sunrise}</div>
							<div>Sun set:{sunset}</div>
						</div>
					</InfoContainer>
					}
				</BoxBody>
			</Box>
		);
	}
}