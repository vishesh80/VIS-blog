import {createStore,combineReducers} from 'redux';

import myBlogsReducer from './reducers/myBlogsReducer';
import profileReducer from './reducers/profileReducer';
import homeBlogsReducer from './reducers/homeBlogsReducer';
 

export default createStore(combineReducers({

    myBlogs: myBlogsReducer,
    profile: profileReducer,
    homeBlogs: homeBlogsReducer

}));