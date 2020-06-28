import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';

import {clearHomeBlogs,getRecent,getPopular,getSearched} from '../redux/actions/homeBlogsActions';
import HomeBlog from './HomeBlog';

const homeBlogs = ({array,dispatch}) => {

    let [state,change] = useState('recent');
    
    useEffect(() => {

        showMore(array, dispatch, state);
        
        return () => {
            dispatch(clearHomeBlogs());
        };

    },[state]);

    return (
        <div className='homeBlogsCont'>
        
            {/* --------------------Search and filters------------------------- */}
            <nav>
                <div className='search'>
                    <input type="text" id="search_text" placeholder="Search"/>
                    <button onClick={e => { 
                        
                        e.preventDefault();
                        
                        search(dispatch);
                        change('search');

                    }}>Search</button>
                </div>

                <div className="filters">
                    <button id='recentBtn' onClick={e => {

                        e.preventDefault();

                        if(state === 'recent') return;
                        document.getElementById('showMoreBtn').disabled = false;
                        dispatch(clearHomeBlogs());
                        change('recent');

                    }}>Recent</button>

                    <button id='popularBtn' onClick={e => {

                        e.preventDefault();

                        if (state === 'popular') return;
                        document.getElementById('showMoreBtn').disabled = false;
                        dispatch(clearHomeBlogs());
                        change('popular');

                    }}>Popular</button>
                </div>

             </nav>
            
            {/* --------------------------Blogs list-------------------------------------- */}

            <div className='homeBlogList'>{array.map(blog => <HomeBlog key={Math.random()} blog={blog}/>)}</div>
            
            <img src="./images/loader.gif" alt="Loading..." id="load" />

            <button onClick={e => showMore(array, dispatch,state,e)} id='showMoreBtn'>Show more</button>


        </div>
    
    );

};


let showMore = (array,dispatch,state,e) => {


    if(e){
        e.persist();
        e.target.disabled = true;
    }
   

    let load = document.getElementById('load');

    let recentBtn = document.getElementById('recentBtn');
    let popularBtn = document.getElementById('popularBtn');

    if (state === 'recent' || state === 'popular') load.classList.toggle('noNone');
    
    if(state === 'recent')
    // Redux Action 
    getRecent((array.length > 0) ? array[array.length - 1].date : undefined)
        .then(action => dispatch(action))
        .catch(err => console.error(err, err.message))
        .finally(() => {
            load.classList.toggle('noNone');
            if(e)e.target.disabled = false;
            
            if (popularBtn.classList.toggle('active_button')) popularBtn.classList.toggle('active_button');
            if (!recentBtn.classList.toggle('active_button')) recentBtn.classList.toggle('active_button');
        });

    if(state === 'popular')
    // Redux Action
        getPopular((array.length > 0) ? array[array.length - 1].views : undefined)
            .then(action => dispatch(action))
            .catch(err => console.error(err, err.message))
            .finally(() => {
                load.classList.toggle('noNone');
                if (e) e.target.disabled = false;

                if (!popularBtn.classList.toggle('active_button')) popularBtn.classList.toggle('active_button');
                if (recentBtn.classList.toggle('active_button')) recentBtn.classList.toggle('active_button');
            });

    if(state === 'search')
    {
        if (recentBtn.classList.toggle('active_button')) recentBtn.classList.toggle('active_button');
        if (popularBtn.classList.toggle('active_button')) popularBtn.classList.toggle('active_button');
    }
};


function search(dispatch)
{

    let load = document.getElementById('load');
    load.classList.toggle('noNone');
     
    //Redux Action
    getSearched(document.getElementById('search_text').value)
    .then(action => {
        
        dispatch(action);
        document.getElementById('showMoreBtn').disabled = true;

    })
    .catch(err => console.error(err,err.message))
    .finally(() => load.classList.toggle('noNone'));
    
}


function mapS2P(state)
{
    return {
        array: state.homeBlogs
    };
}

export default connect(mapS2P)(homeBlogs);