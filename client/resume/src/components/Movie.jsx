import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Status = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 2px 3px;
  border-radius: 5px;
  color: #FFFFFF;
  min-width: 44px;
  text-align: center;
  &.done {
    background-color: #3e8c3e;
  }
  &.in_progress {
    background-color: #ffc107;
  }
  &.not_started {
    background-color: red;
  }
`;
const ReleaseDate = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 2px 3px;
  color: #fff;
  background-color: #308541;
`;
const VisualContainer = styled.div`
  border-radius: 5px;
  background-color: #FFFFFF;
  box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
  position: relative;
`;
const Visual = styled.div`
  padding: 0 10px;
  width: 100%;
  margin-bottom: 15px;
  transition: 0.3s;
  &:hover {
    transform: translateY(-3%);
  }
  @media (min-width: 570px) {
    width: 33.333%;
  }
  @media (min-width: 768px) {
    width: 25%;
  }
`;
const VisualTitle = styled.h3`
  margin: 0;
  color: #4b8a2c;
  font-size: 16px;
`;

const doubanIcon = 'https://img3.doubanio.com/f/talion/2f3c0bc0f35b031d4535fd993ae3936f4e40e6c8/pics/icon/dou32.png';
const imdbIcon = 'https://cdn0.iconfinder.com/data/icons/social-media-2091/100/social-31-512.png';
const errImg = 'https://www.haitioutreach.org/wp-content/uploads/2016/05/404error-graphic.png';

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
  }
  handleErrorImg(e) {
    e.target.onerror = null;
    e.target.src = errImg;
  }
  render() {
    const v = this.props.v;
    let status;
    if (v.current_episode == v.episodes) {
        status = 'done';
    }
    if (v.current_episode < v.episodes) {
        status = 'in_progress';
        if (v.current_episode == 0) {
            status = 'not_started';
        }
    }
    const movieHref = "/movie/" + v.id;
    return (
      <Visual>
        <VisualContainer>
          <Status className={status}>{v.current_episode}/{v.episodes}</Status>
          <ReleaseDate>{v.release_date.substr(0,4)}</ReleaseDate>
          <Link to={movieHref}>
            <img className="visual__image" src={v.poster} alt={v.original_title} onError={(e)=>this.handleErrorImg(e)} />
          </Link>
          <div className="visual__detail">
            <VisualTitle>{v.title}</VisualTitle>
            <div className="visual__ratings">
              <a className="visual__rating" target="_blank" href={'https://movie.douban.com/subject/' + v.douban_id}>
                <img className="visual__rating-icon" src={doubanIcon} alt="" />
                <span className="visual__rating-point">{v.douban_rating}</span>
              </a>
              {v.imdb_id ?
              <a className="visual__rating" target="_blank" href={'https://www.imdb.com/title/' + v.imdb_id}>
                <img className="visual__rating-icon" src={imdbIcon} alt="" />
                <span className="visual__rating-point">{v.imdb_rating}</span>
              </a>
              : null}
            </div>
          </div>
        </VisualContainer>
      </Visual>
    );
  }
}