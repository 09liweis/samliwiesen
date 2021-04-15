import React, {useState} from 'react';

// import Clock from './Clock.jsx';
import Weather from './Weather.jsx';
import About from './About.jsx';
import DeviceInfo from './DeviceInfo.jsx';

import '../css/widgets.css';

const widgets = () => {
  const [show, setShow] = useState(false);
  const widgetClass = show ? 'active' : '';
  return (
    <div className="widgetContainer">
      <div id="widgetBg" className={widgetClass} onClick={()=>setShow(false)}></div>
      <div className={widgetClass} id="widgetToggle" onClick={()=>setShow(true)}><i className="fa fa-angle-double-right"></i></div>
      <div id="widgets" className={widgetClass}>
        <div id="widgetClose" className="fa fa-times" onClick={()=>setShow(false)}></div>
        <About/>
        <DeviceInfo/>
        {/* <Clock/> */}
        <Weather/>
      </div>
    </div>
  );
}
export default widgets;