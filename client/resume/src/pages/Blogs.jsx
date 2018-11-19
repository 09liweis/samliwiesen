import React from 'react';
import axios from 'axios';

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
            <div className="container">
                <h2 className="blogs__title">Blogs</h2>
                <div className="blogs__container">
                    <div className="blog__list">
                        {blogs}
                    </div>
                    <aside className="blog__sidebar">
                        <h2>Side bar</h2>
                    </aside>
                </div>
            </div>
        );
    }
}