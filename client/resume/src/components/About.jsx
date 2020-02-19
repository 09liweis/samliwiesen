import React from 'react';
import styled from 'styled-components';
import {Box, BoxTitle, BoxBody} from './style.jsx';

export default class About extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	componentDidMount() {
	}

	componentWillUnmount() {
		if (this.intervalId) {
			delete this.intervalId;
			// this.intervalId.clearInterval();
		}
	}
	render() {
		const title = 'developer'.split('').map((t,i)=>
			<span key={i}>{t}</span>
		);
		return (
			<Box className="experiences">
				<BoxTitle>
					<i className="boxIcon fa fa-user" aria-hidden="true"></i>
					<span>Hi I am Sam</span>
				</BoxTitle>
				<BoxBody>
					<div id="about">I am a {title}.</div>
				</BoxBody>
			</Box>
		);
	}
}