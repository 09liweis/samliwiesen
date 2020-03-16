import React from 'react';
import { Link,withRouter } from 'react-router-dom';
const navs = [
	{url:'/',tl:'home',icon:'fa fa-home'},
	{url:'/movies',tl:'movies',icon:'fa fa-film'},
	{url:'/blogs',tl:'blogs',icon:'fa fa-rss'},
	{url:'/todo',tl:'todos',icon:'fa fa-list-ol'},
	{url:'/comments',tl:'comments',icon:'fa fa-comments'},
];

class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			highLightPosId:'home',
			highLightPosLeft:0,
			highLightPosWidth:0
		}
		this.setHighLight = this.setHighLight.bind(this);
	}
	componentDidMount() {
		const {location} = this.props;
		const pathName = location.pathname;
		let id;
		navs.map((nav)=>{
			if (nav.url == pathName) {
				id = nav.tl;
			}
		});
		setTimeout(() => {
			this.setHighLight(id);
			this.setState({highLightPosId:id});
		}, 500);
	}
	navClick(id) {
		this.setHighLight(id);
		this.setState({highLightPosId:id});
	}
	navHover(id) {
		this.setHighLight(id);
	}
	setHighLight(id) {
		const el = document.getElementById(id);
		const elData = el.getBoundingClientRect();
		let offset = 0;
		if (window.innerWidth >= 1200) {
			offset = (window.innerWidth - 1200)/2;
		}
		this.setState({highLightPosLeft:elData.left-offset,highLightPosWidth:elData.width});
	}
	render() {
		const {highLightPosId,highLightPosLeft,highLightPosWidth} = this.state;
		const {location} = this.props;
		const pathName = location.pathname;
		const links = navs.map((nav)=> {
			let navClass = 'navItem';
			if (nav.url == pathName) {
				navClass += ' active';
			}
			return (
				<Link className={navClass} id={nav.tl} key={nav.url} to={nav.url} onMouseEnter={this.navHover.bind(this,nav.tl)} onMouseLeave={this.navClick.bind(this,highLightPosId)} onClick={this.navClick.bind(this,nav.tl)}>
					<i className={nav.icon}></i>
					<span>{nav.tl}</span>
				</Link>
			)}
		);
		return(
			<nav id="nav" className="box-shadow">
				<div id="navHighlight" style={{left:highLightPosLeft,width:highLightPosWidth}}></div>
				{links}
				{/* { window.localStorage.getItem('admin') ?
				<NavigationLink to="/transactions">Transactions</NavigationLink>
				:null} */}
			</nav>
		);
	}
}
export default withRouter(Nav);