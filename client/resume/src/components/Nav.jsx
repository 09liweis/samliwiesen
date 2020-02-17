import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationLink = styled(Link)`
	color: #06A763;
	text-decoration: none;
	transition: 1s ease-in;
	font-size: 1.3em;
	&:hover {
		text-decoration: underline;
	}
`;
export const Navigation = styled.nav`
	position: fixed;
	bottom: 0;
	z-index: 1;
	background-color: #ffffff;
	max-width: 1200px;
	width: 100%;
	display:flex;
	margin: auto;
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);
	padding: 10px;
	justify-content:space-around;
	@media (min-width: 768px) {
		margin-bottom: 10px;
		position: static;
	}
`;
const navs = [
	{url:'/',tl:'Home',icon:'fa fa-home'},
	{url:'/movies',tl:'Movies',icon:'fa fa-film'},
	{url:'/blogs',tl:'Blogs',icon:'fa fa-rss'},
	{url:'/todo',tl:'Todos',icon:'fa fa-list-ol'},
	{url:'/comments',tl:'Comments',icon:'fa fa-comments'},
];

export default class Nav extends React.Component {
	render() {
		const links = navs.map((nav)=>
			<NavigationLink key={nav.url} to={nav.url}>
				<i className={nav.icon}></i>
				<span>{nav.tl}</span>
			</NavigationLink>
		);
		return(
			<Navigation>
				{links}
				{/* { window.localStorage.getItem('admin') ?
				<NavigationLink to="/transactions">Transactions</NavigationLink>
				:null} */}
			</Navigation>
		);
	}
}