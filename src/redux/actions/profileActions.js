import {auth} from '../../modules/firebaseAuth';

async function getProfile(currentUser)
{
    let res = await fetch('/api/getProfile/'+currentUser.uid);



    if(res.status === 200) 
    {
        let json = await res.json();
        
        return {type: 'GET_PROFILE',profile: json}
    }
    else
    {
        let profile = {
            name: '',
            city: '',
            country:'',
            age: '',
            bio: "",
            photoURL: '',
        }
        return { type: 'GET_PROFILE', profile}
    }

}



async function editProfile(profile)
{
    profile.uid = auth.currentUser.uid;

    let res =   await fetch('/api/editProfile',
                            {method:'POST',headers:{'Content-Type':'application/json'},
                            body:JSON.stringify(profile)});

    if(res.status >= 400) throw new Error('Failed to save the profile changes.\nTry Later.');

    let json = await res.json();

    return {type:'EDIT_PROFILE',profile:json};
}




async function clearProfile()
{
    let res = await fetch('/api/clearProfile/'+auth.currentUser.uid);

    if (res.status >= 400) throw new Error('Failed to clear the profile.\nTry Later.');

    return {type: 'CLEAR_PROFILE'};
}

function clearProfileOnLogout()
{
    return {type: 'CLEAR_PROFILE'};
}

export {getProfile ,clearProfile, editProfile,clearProfileOnLogout};