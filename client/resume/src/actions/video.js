import axios from 'axios';

export const getVideos = () => {
  return dispatch=> {
    axios.get(`https://api.bilibili.com/x/space/arc/search?mid=19524235&ps=30&tid=0&pn=1&keyword=&order=pubdate&jsonp=jsonp`)
    .then(ex=>
      dispatch({type:'GET_VIDEOS',ex:ex.data})
    );
  }
};