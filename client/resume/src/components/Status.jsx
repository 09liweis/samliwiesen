import React,{useState} from 'react';
import Clock from './Clock.jsx';

const Status = () => {
  const [level, setLevel] = useState(0);
  const [isCharging, setCharging] = useState(false);
  const getBatteryStatus = () => {
    var batteryManager = navigator.getBattery;
    if (typeof batteryManager == 'undefined') {
      return;
    }
    navigator.getBattery().then(function(battery){
      var {level, charging} = battery;
      setCharging(charging);
      setLevel(level);
      battery.addEventListener('chargingchange',function() {
        var {charging} = battery;
        setCharging(charging);
      });
      battery.addEventListener('levelchange',function() {
        var {level} = battery;
        setLevel(level);
      });
    });
  }
  getBatteryStatus();
  return(
    <header id="status">
      <div className="carrie"></div>
      <div className="rightContainer">
        <Clock />
        <div className={`battery ${isCharging?'charging':''}`}>
          {isCharging ? <span className="fa fa-bolt"></span> : null}
          <div className="battery__level">{level * 100}%</div>
        </div>
      </div>
    </header>
  );
}
export default Status;