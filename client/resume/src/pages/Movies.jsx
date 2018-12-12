import React from 'react';
import axios from 'axios';

import styled from 'styled-components';

export const Status = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 3px 7px;
    border-radius: 10px;
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
export const VisualContainer = styled.div`
    border-radius: 5px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    border-bottom: 5px solid transparent;
    position: relative;
`;

import '../css/movies.css';

export default class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visuals: [],
            api: 'https://what-i-watched.herokuapp.com/api/visuals',
            limit: 10,
            loading: true
        };
        this.loadmore = this.loadmore.bind(this);
    }
    componentDidMount() {
        this.setState({loading: true});
        this.page = 1;
        this.getVisuals();
    }
    loadmore() {
        this.page += 1;
        this.getVisuals();
    }
    getVisuals() {
        const {visuals, limit, api} = this.state;
        axios.get(api, {params: {page: this.page, limit: limit}}).then((res) => {
            if (res.status == 200) {
                this.setState({
                    visuals: visuals.concat(res.data.results),
                    loading: false
                });
            }
        });
    }
    render() {
        const visuals = this.state.visuals.map((v) => {
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
            // status += ' visual__status';
            return (
                <div className="visual" key={v.id}>
                    <VisualContainer>
                        <Status className={status}>{v.current_episode}/{v.episodes}</Status>
                        <img className="visual__image" src={v.poster} />
                        <div className="visual__detail">
                            <div>{v.release_date}</div>
                            <h3 className="visual__title">{v.title}</h3>
                            <div className="visual__ratings">
                                <a className="visual__rating" target="_blank" href={'https://movie.douban.com/subject/' + v.douban_id}>
                                    <img className="visual__rating-icon" src="https://img3.doubanio.com/f/talion/2f3c0bc0f35b031d4535fd993ae3936f4e40e6c8/pics/icon/dou32.png" alt="" />
                                    <span className="visual__rating-point">{v.douban_rating}</span>
                                </a>
                                {v.imdb_id ?
                                <a className="visual__rating" target="_blank" href={'https://www.imdb.com/title/' + v.imdb_id}>
                                    <img className="visual__rating-icon" src="https://cdn0.iconfinder.com/data/icons/social-media-2091/100/social-31-512.png" alt="" />
                                    <span className="visual__rating-point">{v.imdb_rating}</span>
                                </a>
                                : null}
                            </div>
                        </div>
                    </VisualContainer>
                </div>
            );
        }
        );
        const loading = this.state.loading;
        return (
            <div className="container">
                <h2 className="visuals__title">What I Watched</h2>
                <div className="visual__list">
                    {loading ?
                        <div className="lds-hourglass"></div>
                        :
                        visuals   
                    }
                </div>
                <button className="loadmore" onClick={this.loadmore}>Load More</button>
            </div>
        );
    }
}