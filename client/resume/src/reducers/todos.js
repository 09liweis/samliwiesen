const todos = (state = {items:[],loading:true}, action) => {
  switch (action.type) {
    case 'GET_TODOS':
      return {items:action.ex,loading:false};
    case 'ADD_TODO':
      var items = [action.ex,...state.items];
      return {items};
    case 'DELETE_TODO':
      var idx = action.idx;
      state.items.splice(idx,1);
      return  {items:state.items};
    default:
      return state;
  }
};
export default todos;