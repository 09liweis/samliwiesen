const todos = (state = {items:[],loading:true}, action) => {
  switch (action.type) {
    case 'GET_TODOS':
      return {items:action.ex,loading:false};
    case 'ADD_TODO':
      return {items:[action.ex,...state.items]};
    default:
      return state;
  }
};
export default todos;