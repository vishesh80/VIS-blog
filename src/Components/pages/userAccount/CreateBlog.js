import React from 'react';
import {connect} from 'react-redux';
import {auth} from '../../../modules/firebaseAuth';

import history from '../../../modules/history';
import Form from '../../BlogForm';

import {createBlog} from '../../../redux/actions/myBlogsActions';


const CB = p => {

    return (
        <div className="formCont">
            <Form onSubmit={onSubmit} dispatch={p.dispatch}/>
        </div>
    );
};



function onSubmit(blog,dispatch)
{
    blog.uid =  auth.currentUser.uid;

    // Redux Action
    createBlog(blog)
    .then(action => {

            dispatch(action);
            history.push('/dashboard');
    })
    .catch(err => alert(err));
    
}

export default connect()(CB);
