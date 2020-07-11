import React from 'react';

import {Box, BoxTitle, BoxBody} from './style.jsx';

const DeviceInfo = () => {
  console.log(window.navigator);
  const nav = window.navigator;
  return (
    <Box className="device">
      <BoxTitle bgColor={'#6d4c41'}>
        <i className="boxIcon fa fa-mobile" aria-hidden="true"></i>
        <span>Device</span>
      </BoxTitle>
      <BoxBody>
        <div>Lang: {nav.language}</div>
        <div>UA: {nav.userAgent}</div>
        <div>Vender: {nav.vendor}</div>
      </BoxBody>
    </Box>
  );
}
export default DeviceInfo;