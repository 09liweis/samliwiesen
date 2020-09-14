import React, {useState,useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {Box, BoxTitle, BoxBody} from '../components/style.jsx';

const Poster = styled.img`
  width: 180px;
  display: block;
  margin: auto;
  border-radius: 10px;
`;

const Movie = (props) => {
  const [visual,setVisual] = useState({id:props.match.params.id});
  const [loading,setLoading] = useState(true);
  function getSummary(douban_id,cb) {
    axios.post('/api/visuals/summary',{douban_id}).then((res) => {
      console.log(res);
      return cb(res);
    });
  }
  useEffect(()=>{
    axios.get(`https://what-i-watched.herokuapp.com/api/visual/${visual.id}`).then((res) => {
      const {douban_id} = res.data.result;
      let v = res.data.result;
      getSummary(douban_id,(res)=> {
        if (res && res.douban_rating) {
          v = Object.assign(v,res);
        }
        setVisual(v);
        setLoading(false);
      });
    });
  },[]);
  return (
    <Box className="movies">
      <BoxTitle>
        <i className="boxIcon fa fa-film" aria-hidden="true"></i>
        <span>{'Movie Title' || visual.title }</span>
      </BoxTitle>
      <BoxBody>
        {loading ?
        <div className="">Loading</div>:
        <div style={{position:'relative'}}>
          <Poster src={visual.poster} />
          <div style={{marginTop: '-20px'}}>
            <div className="visual__rating">{visual.douban_rating}</div>
          </div>
        </div>
        }
      </BoxBody>
    </Box>
  );
}
export default Movie;
