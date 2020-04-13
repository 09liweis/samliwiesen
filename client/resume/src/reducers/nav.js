const navReducer = (state = {highLightPosId:'',highLightPosLeft:0,highLightPosWidth:0}, action) => {
  switch(action.type) {
    case 'SET_NAV':
      return action.payload;
    case 'HOVER_NAV':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default navReducer;