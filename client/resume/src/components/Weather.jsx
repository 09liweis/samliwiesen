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
		.then((response) => {
			this.setState({
				city: response.data.name,
				temp: response.data.main.temp,
				icon: 'https://openweathermap.org/img/w/' + response.data.weather[0].icon + '.png',
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
		const {loading,temp,city,icon} = this.state;
		return (
			<Box className="weather">
				<BoxTitle>
					<i className="fa fa-map-marker" aria-hidden="true"></i>
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
							<div>{Math.floor(temp)} <sup>o</sup>C</div>
						</div>
					</InfoContainer>
					}
				</BoxBody>
			</Box>
		);
	}
}