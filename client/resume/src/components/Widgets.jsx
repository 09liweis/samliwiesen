import React from 'react';

import Clock from './Clock.jsx';
import Weather from './Weather.jsx';
import About from './About.jsx';

const widgets = () => {
  return (
    <div id="widgets">
      Wdigets
      <About/>
      <Clock/>
      <Weather/>
    </div>
  );
}
export default widgets;