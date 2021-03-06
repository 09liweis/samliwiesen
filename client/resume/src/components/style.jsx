import styled from 'styled-components';

export const Intro = styled.div`
  padding: 20px;
  background-color: #06A763;
  color: #ffffff;
`;

export const Box = styled.div`
  background-color: rgba(255,255,255,0.5);
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .16), 0 2px 10px 0 rgba(0, 0, 0, .12);
  transform: translate3d(0,0,0);
  transition: 0.3s ease;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
`;
export const BoxTitle = styled.h2`
  padding: 10px;
  background-color: ${props => props.bgColor || '#06A763'};
  color: #ffffff;
  font-size:18px;
`;
export const BoxBody = styled.div`
  padding: 10px;
`;

export const ExperienceDate = styled.h4`
  margin-top: 10px;
  font-size: 14px;
  font-weight: lighter;
  color: #919c7d;
`;