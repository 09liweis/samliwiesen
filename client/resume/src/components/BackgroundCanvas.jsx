import React from 'react';

const BackgroundCanvas = () => {
  return (
    <canvas id="backgroundCanvas" style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 0
  }}></canvas>
  );
}
export default BackgroundCanvas;