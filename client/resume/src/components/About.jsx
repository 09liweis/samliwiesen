import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Box, BoxTitle, BoxBody} from './style.jsx';

const About = () => {
  const title = 'developer'.split('').map((t,i)=>
    <span key={i}>{t}</span>
  );
  return (
    <Box className="about">
      <BoxTitle>
        <i className="boxIcon fa fa-user" aria-hidden="true"></i>
        <span>Hi I am Sam</span>
      </BoxTitle>
      <BoxBody>
        <div id="about">I am a {title}</div>
      </BoxBody>
    </Box>
  );
};
export default About;