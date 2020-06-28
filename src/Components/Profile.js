import React from 'react';
import {connect} from 'react-redux';
import { auth } from '../modules/firebaseAuth';

const Profile = ({profile}) => {

    
    return (
    <div className='profile'>
    <img src={(profile.photoURL || auth.currentUser.photoURL)} alt="DP" id="dp" />
    <h2>{profile.name || auth.currentUser.displayName}</h2>
    <h5>{(profile.city)?profile.city+", "+profile.country:""}</h5>
    <h5>{profile.age ? profile.age + ' years old' : ''}</h5>
    <section>
    {formatContent(profile.bio)}
    </section>
    </div>);

};

function formatContent(content) {

    if(!content) return '';
    let array = content.split(/\n\s*\n/);
    return array.map(x => <p key={Math.random()}>{x}</p>);
}

function mapS2P(state)
{
    return {
        profile:state.profile
    };
}

export default connect(mapS2P)(Profile);