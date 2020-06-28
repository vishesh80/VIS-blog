import React from 'react';
import Header from '../Header'

const About = (p) => (
  <>
    <Header />
    <div className="aboutCont">
    <main>
        <p>
            <span>Vis blog </span>
             is a website for anyone, who wants a simple and power powerful blogging platform. It is also very fast as it is
            built with react.js. So, the audience can also read the new and there favorite blogs without any delays. The website is
            very beginner-friendly but powerful enough to create, manage, and distribute blogs.
        </p>
        <p>
            Anyone can log in via there google account and use the blogging features of the Vis blog. it provides a simple          interface
            for writing clear and concise blogs. the blogs created by the user can be edited and deleted by the user if he/she
            wants. The list of the blogs created by the user is given on the dashboard. The user can track the views of there           blogs.
            And the blogs are deployed on the home page of vis blogs for the audience. the spectator can find the blogs and can             also
            see the sorted list of blogs on the basis of date or views.
        </p>
        <p>
            Vis blog front-end is created by using the react.js and the back-end is written in node.js. For data storage, MongoDB is
            used. The combination of these technologies made the vis blog lightweight and a very fast web application.
        </p>
    </main>
 
    <aside>

        <div><img src="./images/user.png" alt=""/></div>

        <section>
          <h2>Developer</h2>
            <p>Hey, my name is Vishesh. I am from New Delhi. Software development is my passion. I have worked on   android development, have learned Java to build some software for pc, now working on web development and M.E.R.N stack is my main web Stack.</p>
            <h4>Vishesh.tapan11@gmail.com</h4>
        </section>

    </aside>

    

  </div>
  </>
); 

export default About;