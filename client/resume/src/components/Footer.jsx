import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
	background-color: #06A763;
	padding: 30px 0;
	color: #ffffff;
	text-align: center;
	margin-top: 30px;
`;

const Footer = () => 
	<FooterContainer>
		Made with React and By Sam Li © {new Date().getFullYear()}
	</FooterContainer>;
export default Footer;