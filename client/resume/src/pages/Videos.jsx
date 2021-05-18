import React, {useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {getVideos} from '../actions/video';
import {Box, BoxTitle, BoxBody} from '../components/style.jsx';

import '../css/movies.css';

const Movies = () => {
  var [page,setPage] = useState(1);
  const {items,loading} = useSelector(state => state.vidoes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideos());
  },[]);
  return (
    <Box className="movies">
      <BoxTitle>
        <i className="boxIcon fa fa-film" aria-hidden="true"></i>
        <span>What I Watched</span>
      </BoxTitle>
      <BoxBody>
        <div className="visual__list">
          {loading ?<div className="lds-hourglass"></div>:visuals}
        </div>
      </BoxBody>
    </Box>
  );
}
export default Movies;