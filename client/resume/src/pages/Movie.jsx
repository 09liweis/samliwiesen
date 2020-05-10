import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {Box, BoxTitle, BoxBody} from '../components/style.jsx';

const Movie = (props) => {
  console.log(props.match.params.id);
  const [visual,setVisual] = useState({id:props.match.params.id});
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    axios.get(`https://what-i-watched.herokuapp.com/api/visual/${visual.id}`).then((res) => {
      setVisual(res.data.result);
      setLoading(false);
    });
  },[]);
  return (
    <Box className="movies">
      <BoxTitle>
        <i className="boxIcon fa fa-film" aria-hidden="true"></i>
        <span>Movie Title</span>
      </BoxTitle>
      <BoxBody>
        <div className="visual__detail">
          {loading ?
          <div className="lds-hourglass"></div>:
          <div>{visual.title}</div>
          }
        </div>
      </BoxBody>
    </Box>
  );
}
export default Movie;
