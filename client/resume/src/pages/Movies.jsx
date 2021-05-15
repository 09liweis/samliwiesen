import React, {useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {getMovies} from '../actions/movie';
import {Box, BoxTitle, BoxBody} from '../components/style.jsx';
import Movie from '../components/Movie.jsx';

import '../css/movies.css';

const Movies = () => {
  var [page,setPage] = useState(1);
  const {items,loading} = useSelector(state => state.movies);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovies({limit:15,page}));
  },[]);
  const handleLoadmore = () => {
    page += 1;
    setPage(page);
    dispatch(getMovies({limit:15,page}));
  }
  const visuals = items.map((v) => {
    return (
      <Movie v={v} key={v.id} />
    );
  });
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
        <div className="visual__loadmore" onClick={()=>handleLoadmore()}>Load More</div>
      </BoxBody>
    </Box>
  );
}
export default Movies;