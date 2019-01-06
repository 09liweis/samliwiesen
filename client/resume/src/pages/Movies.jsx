import React from 'react';
import axios from 'axios';

import styled from 'styled-components';

import Movie from '../components/Movie.jsx';

import '../css/movies.css';

export default class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visuals: [],
            api: 'https://what-i-watched.herokuapp.com/api/visuals',
            limit: 20,
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
            // status += ' visual__status';
            return (
                <Movie v={v} key={v.id} />
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