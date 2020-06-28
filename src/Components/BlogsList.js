import React from 'react';
import {connect} from 'react-redux';
import Blog from './Blog';



const BlogList = p => {

    return (<div>{p.blogs.map(blog => (<Blog key={blog._id} blog={blog}/>))}</div>);
};


function mapStoP(state)
{
    return {
        blogs: state.myBlogs,
    };
}

export default connect(mapStoP)(BlogList);