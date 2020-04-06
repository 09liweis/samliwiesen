import axios from 'axios';

export const getBlogs = () => {
  return dispatch=> {
    axios.get('https://samliweisen.herokuapp.com/api/blogs?origin=localhost')
    .then(ex=>
      dispatch({type:'GET_BLOGS',blogs:ex.data})
    );
  }
};