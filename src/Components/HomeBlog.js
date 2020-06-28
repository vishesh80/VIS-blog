import React from 'react';
import history from '../modules/history';

const HomeBlog = ({blog}) => {

    return (
        <div>
            <h2>{blog.title}</h2>
            <p>{blog.content.slice(0,450)+"....."}</p>
            <a  onClick={e => {
                e.preventDefault();
                localStorage.setItem('displayBlog',JSON.stringify(blog));
                history.push('/displayBlog');

            }}>Continue Reading</a>
        </div>
    );

};

export default HomeBlog;