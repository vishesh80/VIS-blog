import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {editProfile,clearProfile} from '../../../redux/actions/profileActions';


const EditProfile = ({dispatch,profile,history}) => {

    let [state,change] = useState({...profile});

    return (

    <div className='profileCont'>
        <div>
            <input 
            type="text" 
            value={state.name} 
            placeholder="Name" 
            onChange={e=>change({...state,name:e.target.value})}
            />

            <input
            type="number"
            value={state.age}
            placeholder="Age"
                    onChange={e => change({ ...state, age: Number(e.target.value)})}
            />

            <input 
            type="text" 
            value={state.country}
            placeholder="Country"
                    onChange={e => change({ ...state, country: e.target.value })}
             />

            <input 
            type="text"
            value={state.city}
            placeholder="City"
                    onChange={e => change({ ...state, city: e.target.value })}
            />

            <textarea 
            id=""value={state.bio}
            cols="30" rows="10"
            placeholder="Bio."
                    onChange={e => change({ ...state, bio: e.target.value })}>
            </textarea>

            <section>
                <img src={state.photoURL} alt=""/>
            </section>
            
            <button className='uploadBtn' onClick={e => upload(state, change)}>Upload Display Picutre</button>

                                  {/*Redux Action */}
            <button  className='saveBtn'
                     onClick={e => (isValid(state))?editProfile(state)
                                  .then(action => {
                                      
                                    dispatch(action);
                                    history.push('/dashboard');
                                    
                                  })
                                  .catch(err => console.error(err,err.message)):alert('Please fill all the Form feilds with valid information.And Bio. should contain atleast 15 words.')}
                                  >Save</button>

                <button className='clearBtn'
                        onClick={ e => clearProfile()
                                        .then(action  => dispatch(action))
                                        .catch(err => {
                                            
                                            console.error(err,err.message);
                                            alert('Failed to clear changes\nTry Later.');

                                        })
                                        .finally(() => history.push('/dashboard'))
                                        }>Clear Profile</button>

            <input type="file" id="imageFile" style={{ display: "none" }}></input>
        </div>
    </div>

    );    

};

function upload(state, change) {
    let file = document.getElementById('imageFile');

    let onChange = e => {

        let image = file.files[0];

        if ((image.size / 1024) / 1024 > 2)
            return alert("Image size should be less than 2 MB");

        if (/image\//.test(image.type)) {
            let reader = new FileReader();
            reader.addEventListener('load', () => change({ ...state, photoURL: reader.result}));
            reader.readAsDataURL(image);
        }
        else change({ ...state, photoURL: "" });

        file.type = '';
        file.type = 'file';
        file.removeEventListener('change', onChange)
    };

    file.addEventListener('change', onChange);
    file.click();
}

function mapS2P(state)
{
    return {
        profile: state.profile
    }
}

function isValid({name,age,country,city,bio}) {


    if (/^[a-zA-Z\s]{3,35}$/.test(name.trim()) && 
        /^[a-zA-Z\s]{3,20}$/.test(country.trim()) &&
        /^[a-zA-Z\s]{3,20}$/.test(city.trim()) &&
        /^[^`]{50,5000}$/.test(bio.trim()) &&
        age > 5)
        return true;
    else return false;
}


export default connect(mapS2P)(EditProfile);