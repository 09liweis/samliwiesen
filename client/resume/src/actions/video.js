import axios from 'axios';

export const getVideos = () => {
  return dispatch=> {
    axios.post('/api/visuals/bilibili')
    .then(ex=>
      dispatch({type:'GET_VIDEOS',ex:ex.data})
    );
  }
};