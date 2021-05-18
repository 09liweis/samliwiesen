const videos = (state = {items:[],loading:true}, action) => {
  switch (action.type) {
    case 'GET_VIDEOS':
      var items = state.items.concat(action.ex);
      return {items,loading:false};
    default:
      return state;
  }
};
export default videos;