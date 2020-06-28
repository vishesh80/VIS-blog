import React from "react";
import {auth,googleauthProvider} from '../../modules/firebaseAuth';

const Login = (p) => (
  <div className='loginCont'>
    <div className='loginCard'>
      <h3>Easy login with your existing google account</h3>
      <button onClick={e => auth.signInWithPopup(googleauthProvider)}>Login with Google</button>
    </div>
  </div>
);


export default Login;
