export const setNav = (navId) => {
  console.log(navId);
  const el = document.getElementById(navId);
  const elData = el.getBoundingClientRect();
  let offset = 0;
  if (window.innerWidth >= 1200) {
    offset = (window.innerWidth - 1200)/2;
  }
  console.log({highLightPosLeft:elData.left-offset,highLightPosWidth:elData.width});
  return {
    type:'SET_NAV',
    payload:{highLightPosId:navId,highLightPosLeft:elData.left-offset,highLightPosWidth:elData.width}
  };
};