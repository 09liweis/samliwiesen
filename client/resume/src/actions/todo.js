import axios from 'axios';

export const getTodos = () => {
  return dispatch=> {
    axios.get('/api/todos')
    .then(ex=>
      dispatch({type:'GET_TODOS',ex:ex.data})
    );
  }
};