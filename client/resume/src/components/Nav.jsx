import React from 'react';
import { Link,withRouter } from 'react-router-dom';
const navs = [
	{url:'/',tl:'Home',icon:'fa fa-home'},
	{url:'/movies',tl:'Movies',icon:'fa fa-film'},
	{url:'/blogs',tl:'Blogs',icon:'fa fa-rss'},
	{url:'/todo',tl:'Todos',icon:'fa fa-list-ol'},
	{url:'/comments',tl:'Comments',icon:'fa fa-comments'},
];

class Nav extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const {location} = this.props;
		const pathName = location.pathname;
		const links = navs.map((nav)=> {
			let navClass = 'navItem';
			if (nav.url == pathName) {
				navClass += ' active';
			}
			return (
				<Link className={navClass} key={nav.url} to={nav.url}>
					<i className={nav.icon}></i>
					<span>{nav.tl}</span>
				</Link>
			)}
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
export default withRouter(Nav);