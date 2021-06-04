import React,{useState} from 'react';
import { Link,withRouter } from 'react-router-dom';
const navs = [
  {url:'/',tl:'home',icon:'fa fa-home'},
  {url:'/movies',tl:'movies',icon:'fa fa-film'},
  {url:'/blogs',tl:'blogs',icon:'fa fa-rss'},
  {url:'/videos',tl:'vlog',icon:'fa fa-film'},
  {url:'/todo',tl:'todos',icon:'fa fa-list-ol'},
  {url:'/comments',tl:'comments',icon:'fa fa-comments'},
];

const getNavClientRect = (id) => {
  if (!id) return {highLightPosLeft:0,highLightPosWidth:0};
  const el = document.getElementById(id);
  const elData = el.getBoundingClientRect();
  let offset = 0;
  if (window.innerWidth >= 1200) {
    offset = (window.innerWidth - 1200)/2;
  }
  return {highLightPosLeft:elData.left-offset,highLightPosWidth:elData.width}
}

const getNavElementData = (navId,isClick) => {
  const {highLightPosLeft,highLightPosWidth} = getNavClientRect(navId);
  var ret = {highLightPosLeft,highLightPosWidth};
  if (isClick) {
    ret.highLightPosId = navId;
  }
  return ret;
};

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
  const [activeNav, setActiveNav] = useState({highLightPosId:'',highLightPosLeft:0,highLightPosWidth:0});

  const {location} = props;
  const tl = getTlWithUrl(location.pathname);
  if (activeNav.highLightPosId == '') {
    setTimeout(()=>{
      handleNav(tl,1);
    },500);
  }
  window.addEventListener('resize', () => {
    handleNav(tl,1);
  });
  const handleNav = (id, isClick) => {
    var ret = getNavElementData(id,isClick);
    setActiveNav(Object.assign(activeNav,ret));
  }
  const links = navs.map((nav)=> {
    let navClass = 'navItem';
    if (nav.tl == tl) {
      navClass += ' active';
    }
    return (
      <Link className={navClass} id={nav.tl} key={nav.url} to={nav.url} onMouseEnter={()=>handleNav(nav.tl)} onClick={()=>handleNav(nav.tl,1)}>
        <i className={nav.icon}></i>
        <span>{nav.tl}</span>
      </Link>
    )}
  );
  return(
    <nav id="nav" className="box-shadow" onMouseLeave={()=>handleNav(activeNav.highLightPosId,1)}>
      <div id="navHighlight" style={{left:activeNav.highLightPosLeft,width:activeNav.highLightPosWidth}}></div>
      {links}
    </nav>
  );
}
export default withRouter(Nav);