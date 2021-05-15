const movies = (state = {items:[],loading:true}, action) => {
  switch (action.type) {
    case 'GET_MOVIES':
      return {items:action.ex,loading:false};
    case 'GET_MORE_MOVIES':
      var items = [action.ex,...state.items];
      return {items,loading:false};
    default:
      return state;
  }
};
export default movies;