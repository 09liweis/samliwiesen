import React from 'react';
import styled from 'styled-components';
import {Box, BoxTitle, BoxBody} from './style.jsx';

const Dates = styled.span`
	font-size: 1em;
	margin-right: 10px;
`;

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
		return (
			<Box className="experiences">
				<BoxTitle>
					<i className="boxIcon fa fa-user" aria-hidden="true"></i>
					<span>Hi I am Sam</span>
				</BoxTitle>
				<BoxBody>
					I am a developer.
				</BoxBody>
			</Box>
		);
	}
}