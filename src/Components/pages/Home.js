import React from "react";
import Header from "../Header";

import {auth} from '../../modules/firebaseAuth';
import HomeBlogs from '../HomeBlogs';

const Home = p => (
  <>
    <Header />
    <HomeBlogs/>
  </>
);


export default Home;
