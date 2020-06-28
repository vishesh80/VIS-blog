import React from 'react';
import {connect} from 'react-redux';
import Form from '../../BlogForm';
import {auth} from '../../../modules/firebaseAuth';
import history from '../../../modules/history';
import {editBlog} from '../../../redux/actions/myBlogsActions';


const EditBlog = p => {

    return (
        <div className='formCont'>
            <Form dispatch={p.dispatch} defaultt={p.blog} onSubmit={onSubmit}/>
        </div>
    );
};

function onSubmit(edit,dispatch)
{
    edit.uid = auth.currentUser.uid;

    editBlog(edit)
    .then(action => {
        
        dispatch(action);
        history.push('/dashboard');
    })
    .catch(err => alert(err.message));

}

function mapS2P(state,props)
{
    let _id = props.match.params._id;

    let blog = state.myBlogs.filter(blog => blog._id === _id)[0];

    return { blog };
}

export default connect(mapS2P)(EditBlog);