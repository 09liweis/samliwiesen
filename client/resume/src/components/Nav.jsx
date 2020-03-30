import React from 'react';
import { connect,useSelector,useDispatch } from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import {setNav} from '../actions/nav.js';
const navs = [
	{url:'/',tl:'home',icon:'fa fa-home'},
	{url:'/movies',tl:'movies',icon:'fa fa-film'},
	{url:'/blogs',tl:'blogs',icon:'fa fa-rss'},
	{url:'/todo',tl:'todos',icon:'fa fa-list-ol'},
	{url:'/comments',tl:'comments',icon:'fa fa-comments'},
];

const Nav = () => {
	const nav = useSelector(state => state.nav);
	const dispatch = useDispatch();
	const {highLightPosId,highLightPosLeft,highLightPosWidth} = nav;
	// const {location} = this.props;
	// const pathName = location.pathname;
	const links = navs.map((nav)=> {
		let navClass = 'navItem';
		// if (nav.url == pathName) {
		// 	navClass += ' active';
		// }
		return (
			<Link className={navClass} id={nav.tl} key={nav.url} to={nav.url} onClick={()=>dispatch(setNav(nav.tl))}>
			{/* <Link className={navClass} id={nav.tl} key={nav.url} to={nav.url} onMouseEnter={this.navHover.bind(this,nav.tl)} onMouseLeave={this.navClick.bind(this,highLightPosId)} onClick={this.navClick.bind(this,nav.tl)}> */}
				<i className={nav.icon}></i>
				<span>{nav.tl}</span>
			</Link>
		)}
	);
	return(
		<nav id="nav" className="box-shadow">
			<div id="navHighlight" style={{left:highLightPosLeft,width:highLightPosWidth}}></div>
			{links}
		</nav>
	);
}
export default Nav;