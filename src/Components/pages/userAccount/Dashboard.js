import React from "react";
import {auth} from '../../../modules/firebaseAuth';
import Profile from '../../Profile';
import BlogsList from '../../BlogsList';



const Dashboard = p => (
<div className='dashboardCont'>

    <Profile/>

    <main>
        <nav>
            <button onClick={e => p.history.push('/editProfile')}>Profile</button>
            <button onClick={e => p.history.push('/createBlog')}>Create Blog</button>
            <button className='logoutBtn' onClick={e => auth.signOut()}>Logout</button>
        </nav>
        <BlogsList/>
    </main>

</div>
);




export default Dashboard;