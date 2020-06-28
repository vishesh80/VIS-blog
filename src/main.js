import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './Components/MainRouter';

import './styles/main.scss';
import {auth} from './modules/firebaseAuth';
import history from './modules/history';
import store from './redux/store';

import {getAll , clearMyBlogs} from './redux/actions/myBlogsActions';
import {getProfile,clearProfileOnLogout} from './redux/actions/profileActions';


ReactDOM.render(<Provider store={store}><App/></Provider>,document.getElementById("root"));


auth.onAuthStateChanged(async (user) => {

  if (user){
    
    // Redux Actions

     getAll(user.uid)
     .then(action => {
        store.dispatch(action);
        history.push("/dashboard");
     })
     .catch(err => alert(err));


    getProfile(auth.currentUser)
      .then(action => store.dispatch(action))
      .catch(err => console.error(err, err.message));
  }


  else{

    history.push("/");
      //Redux Action
      store.dispatch(clearMyBlogs());
      store.dispatch(clearProfileOnLogout());
  } 

});