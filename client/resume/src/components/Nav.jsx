import React from 'react';
import { Link } from 'react-router-dom';
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
			<Link className="navItem" key={nav.url} to={nav.url}>
				<i className={nav.icon}></i>
				<span>{nav.tl}</span>
			</Link>
		);
		return(
			<nav id="nav">
				{links}
				{/* { window.localStorage.getItem('admin') ?
				<NavigationLink to="/transactions">Transactions</NavigationLink>
				:null} */}
			</nav>
		);
	}
}