import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Box, BoxTitle, BoxBody} from './style.jsx';

const City = styled.div`
  font-size: 1em;
`;
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
			feels_like:'',
			description:'',
			icon: '',
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
			this.setState({
				description:weather.description,
				feels_like:main.feels_like,
				city: data.name,
				temp: main.temp,
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
		const {loading,temp,city,icon,feels_like,description} = this.state;
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
						<img src={icon}/>
						<div>
							<City>{city}</City>
							<div>{Math.floor(temp)} <sup>o</sup>C Feels like {Math.floor(feels_like)} <sup>o</sup>C</div>
							<div>{description}</div>
						</div>
					</InfoContainer>
					}
				</BoxBody>
			</Box>
		);
	}
}