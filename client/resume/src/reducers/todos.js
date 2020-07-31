const todos = (state = [], action) => {
  switch (action.type) {
    case 'GET_TODOS':
      return action.ex;
    case 'ADD_TODO':
      return state;
    default:
      return state;
  }
};
export default todos;