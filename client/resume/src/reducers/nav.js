const navReducer = (state = {highLightPosId:'',highLightPosLeft:0,highLightPosWidth:0}, action) => {
	switch(action.type) {
		case 'SET_NAV':
			return action.payload;
		case 'HOVER_NAV':
			const highLightPosLeft = action.payload.highLightPosLeft;
			const highLightPosWidth = action.payload.highLightPosWidth;
			return {highLightPosId:state.highLightPosId,highLightPosLeft,highLightPosWidth}
		default:
			return state;
	}
};

export default navReducer;