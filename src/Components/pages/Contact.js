import React from "react";
import Header from "../Header";

const Contact = (p) => (
  <>
    <Header />
    <div className='contactCont'>
      <div>
        <input type="text" placeholder="Your Name" id="contact_name"/>
          <input type="text" placeholder="Email address" id="contact_email"/>
            <textarea placeholder="Description" id="contact_desc" cols="30" rows="10"></textarea>
            <button id="contact_submit" onClick={onSubmit}>Submit</button>
      </div>
    </div>
  </>
);

function onSubmit()
{
    let contact = {
      name: document.getElementById('contact_name').value.trim(),
      email: document.getElementById('contact_email').value.trim(),
      desc: document.getElementById('contact_desc').value.trim()
    };

    /*---Validation---- */

      let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if(!(contact.name && contact.email && /[a-zA-Z]{2,50}/.test(contact.name) && emailRegex.test(contact.email)))
      return alert('Enter the Valid Information.');

  
    fetch('/api/saveContact',{
      method:"POST",
      body: JSON.stringify(contact),
      headers:{'Content-Type':'application/json'}
    })
    .then(res => {

        if(res.status === 200) alert("Message Sent !");
        else throw new Error('Failed to sent the message.\nTry later.');
    })
    .catch(err => {

        console.error(err,err.message);
        alert('Failded to sent the message.\nTry later.');
    })
    .finally(() => {

        document.getElementById('contact_name').value = ''
        document.getElementById('contact_email').value= ''
        document.getElementById('contact_desc').value= ''
        
    });
}

export default Contact;
