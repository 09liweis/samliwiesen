import axios from 'axios';

export const getMovies = () => {
  return dispatch=> {
    axios.get('https://what-i-watched.herokuapp.com/api/visuals')
    .then(ex=>
      dispatch({type:'GET_MOVIES',ex:ex.data})
    );
  }
};