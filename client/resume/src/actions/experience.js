import axios from 'axios';

export const getExperiences = () => {
  return dispatch=> {
    axios.get('https://samliweisen.herokuapp.com/api/experiences?origin=localhost')
    .then(ex=>
      dispatch({type:'GET_EXPERIENCES',ex:ex.data})
    );
  }
};