export const getNavClientRect = (id) => {
  const el = document.getElementById(id);
  const elData = el.getBoundingClientRect();
  let offset = 0;
  if (window.innerWidth >= 1200) {
    offset = (window.innerWidth - 1200)/2;
  }
  return {highLightPosLeft:elData.left-offset,highLightPosWidth:elData.width}
}

export const setNav = (navId) => {
  const {highLightPosLeft,highLightPosWidth} = getNavClientRect(navId);
  return {
    type:'SET_NAV',
    payload:{highLightPosId:navId,highLightPosLeft,highLightPosWidth}
  };
};
export const hoverNav = (navId) => {
  const {highLightPosLeft,highLightPosWidth} = getNavClientRect(navId);
  return {
    type:'HOVER_NAV',
    payload:{highLightPosLeft,highLightPosWidth}
  }
}