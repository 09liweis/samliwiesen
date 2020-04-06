import React from 'react';
import axios from 'axios';
import {Box, BoxTitle, BoxBody} from '../components/style.jsx';

import '../css/blogs.css';

export default class Blogs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			blogs: [],
			api: 'https://samliweisen.herokuapp.com/api/blogs'
		};
	}
	componentDidMount() {
		this.getBlogs();
	}
	getBlogs() {
		axios.get(this.state.api).then((res) => {
			if (res.status == 200) {
				this.setState({
					blogs: res.data
				});
			}
		});
	}
	render() {
		const blogs = this.state.blogs.map((b) => {
			return (
				<article className="blog" key={b._id}>
					<h3 className="blog__title">{b.title}</h3>
					<div className="blog__attr">
						<span className="blog__date">{b.created_at.substr(0, 10) }</span>
						<span className="blog__category">{b.category}</span>
					</div>
					{b.image ?
					<img className="blog__image" src={b.image} />
					: null}
					<section dangerouslySetInnerHTML={{ __html:'' }}></section>
				</article>
			);
		});
		return (
			<Box className="movies">
				<BoxTitle>
					<i className="boxIcon fa fa-film" aria-hidden="true"></i>
					<span>Blogs</span>
				</BoxTitle>
				<BoxBody>
					{blogs}
				</BoxBody>
			</Box>
		);
	}
}