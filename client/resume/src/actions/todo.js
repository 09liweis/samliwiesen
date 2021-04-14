import axios from 'axios';

export const getTodos = () => {
  return dispatch=> {
    axios.get('/api/todos')
    .then(ex=>
      dispatch({type:'GET_TODOS',ex:ex.data})
    );
  }
};

export const addTodo = (todo) => {
  return dispatch=> {
    axios.post('/api/todos',todo)
    .then(ex=>
      dispatch({type:'ADD_TODO',ex:ex.data})
    );
  }
}

export const editTodo = (todo,idx) => {
  return dispatch=> {
    axios.put(`/api/todos/${todo._id}`,todo)
    .then(ex=>
      dispatch({type:'EDIT_TODO',ex:ex.data,idx})
    );
  }
}

export const deleteTodo = (todoId,idx) => {
  return dispatch=> {
    axios.delete(`/api/todos/${todoId}`)
    .then(ex=>
      dispatch({type:'DELETE_TODO',idx})
    );
  }
}