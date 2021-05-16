import React,{useState} from 'react';

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
      <span>{level}</span>
      <span>{isCharging?'charging':''}</span>
    </header>
  );
}
export default Status;