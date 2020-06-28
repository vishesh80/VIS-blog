import React from 'react';
import {connect} from 'react-redux';
import {auth} from '../modules/firebaseAuth';
import {deleteBlog} from '../redux/actions/myBlogsActions'
import history from '../modules/history';

const Blog = ({blog,dispatch}) => (
    <div className="dashboardBlogItem">
        <main>
        <h2>{blog.title}</h2>
        <p>{formatdate(blog.date)}</p>
        </main>
        <aside>
            <div>
                <button className='editBtn' onClick={e => history.push('/editBlog/' + blog._id)} >EDIT</button>
                <button className='deleteBlogBtn'
                    onClick={e => deleteBlog(auth.currentUser.uid, blog._id, blog.bannerid)
                        .then(action => dispatch(action))
                        .catch(err => alert(err))
                    }>X</button>
            </div>
            <section><h2>{parseInt(blog.views)}</h2><img src="./images/views.png" alt=""></img></section>
        </aside>
    </div>
);



function formatdate(timestamp)
{
    let date = new Date(timestamp);
    return date.toDateString();
}

export default connect()(Blog);