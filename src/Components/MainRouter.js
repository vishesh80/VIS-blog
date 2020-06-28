import React from 'react';
import {Router, Route ,Switch} from 'react-router-dom';
import history from '../modules/history';

import about from './pages/About';
import contact from './pages/Contact';
import login from './pages/Login';
import home from './pages/Home';
import dashboard from './pages/userAccount/Dashboard';
import createBlog from './pages/userAccount/CreateBlog';
import editBlog from './pages/userAccount/EditBlog';
import editProfile from './pages/userAccount/EditProfile';
import displayBlog from './pages/DisplayBlog';

const App = p => {

  return (
  <Router history={history}>
    <Switch>
      <Route path="/" exact={true} component={home} />
      <Route path="/login" exact={true} component={login} />
      <Route path="/about" exact={true} component={about} />
      <Route path="/contact" exact={true} component={contact} />
      <Route path="/dashboard" exact={true} component={dashboard} />
      <Route path="/createBlog" exact={true} component={createBlog} />
      <Route path="/editBlog/:_id" exact={true} component={editBlog} />
      <Route path="/editProfile" exact={true} component={editProfile} />
      <Route path="/displayBlog" exact={true} component={displayBlog} />
      <Route component={p => (<h1>404 Page not Found</h1>)} />
    </Switch>
  </Router>
);
};



export default App;