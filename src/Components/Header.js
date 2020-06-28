import React from "react";
import {Link ,useRouteMatch} from 'react-router-dom';

const Header = (p) =>  {

    let match = useRouteMatch();


    return (
      <div className='header'>
        <h1>VIS Blog</h1>

        <div className='navCont'>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>

       
        {cond(match.url)}
        

      </div>
    );

};

function cond(url)
{
    
  if (/\/contact/.test(url)) return (
  <div className="header_content">
      <h2>Contact</h2>
      <p>We welcome any suggestions and feedback.</p>
  </div>);

  else if (/\/about/.test(url)) return (
    <div className="header_content">
      <h2>About</h2>
      <p>What this website do.</p>
    </div>);

  else return (
    <div className="header_content">
      <h2>Easy Blogging</h2>
      <p>from Anywhere, at Anytime.</p>
      <Link to="/login">Create Blog</Link>
    </div>);
}

export default Header;
