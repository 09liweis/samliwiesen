import React from 'react';
import { connect,useSelector,useDispatch } from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import {setNav,hoverNav} from '../actions/nav.js';
const navs = [
	{url:'/',tl:'home',icon:'fa fa-home'},
	{url:'/movies',tl:'movies',icon:'fa fa-film'},
	{url:'/blogs',tl:'blogs',icon:'fa fa-rss'},
	{url:'/todo',tl:'todos',icon:'fa fa-list-ol'},
	{url:'/comments',tl:'comments',icon:'fa fa-comments'},
];

const getTlWithUrl = (url)=> {
	let id;
	navs.map((nav)=>{
		if (nav.url == url) {
			id = nav.tl;
		}
	});
	return id;
}

const Nav = (props) => {
	const nav = useSelector(state => state.nav);
	const dispatch = useDispatch();
	const {highLightPosId,highLightPosLeft,highLightPosWidth} = nav;
	const {location} = props;
	const tl = getTlWithUrl(location.pathname);
	if (highLightPosId == '') {
		setTimeout(()=>{
			dispatch(setNav(tl));
		},500);
	}
	const links = navs.map((nav)=> {
		let navClass = 'navItem';
		if (nav.tl == tl) {
			navClass += ' active';
		}
		return (
			<Link className={navClass} id={nav.tl} key={nav.url} to={nav.url} onMouseEnter={()=>dispatch(hoverNav(nav.tl))} onClick={()=>dispatch(setNav(nav.tl))}>
				<i className={nav.icon}></i>
				<span>{nav.tl}</span>
			</Link>
		)}
	);
	return(
		<nav id="nav" className="box-shadow" onMouseLeave={()=>dispatch(setNav(highLightPosId))}>
			<div id="navHighlight" style={{left:highLightPosLeft,width:highLightPosWidth}}></div>
			{links}
		</nav>
	);
}
export default withRouter(Nav);