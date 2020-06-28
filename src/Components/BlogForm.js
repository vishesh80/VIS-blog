import React,{useState,useEffect} from 'react';


const form = p => 
{
    
    let [state,change] = useState({title:"",content:"",banner:"",bchanged: false});


    if(p.defaultt)
    useEffect(() => {

            let url = (p.defaultt.bannerid) ? ('/api/Banner/' + p.defaultt.bannerid) : '/api/Banner/empty';
            change({ ...p.defaultt, banner: "",bchanged:false});

            let modal = document.getElementById('modal');
            modal.classList.toggle('modal');
            
            fetch(url)
                .then(res => {

                    if (res.status >= 400) throw new Error("Banner Not Found");
                    return res.json();
                })
                .then(json => change({ 
                    ...p.defaultt,
                    banner:json.banner,
                    bchanged:false
                }))
                .catch(err => console.error(err.message))
                .finally(() => modal.classList.toggle('modal'));

    },[]);
    




    return (
        <div>
            <input type="file" id="banner" style={{display: "none"}}></input>

            <input 
                id="title" type="text" placeholder="Title" 
                value={state.title} 
                onChange={e => change({ ...state, title: e.target.value})}/>

            <section><img id="bannerImg" src={state.banner} alt="" /></section>

            <textarea id="content" cols="30" rows="20" placeholder="Content"
                      value={state.content}
                      onChange={e => change({ ...state, content: e.target.value})}></textarea>
            
            { (!state.banner) ? 
            <button className='uploadBtn' onClick={e => upload(state, change)}>Banner image (Optional)</button>:
            <button className='unUploadBtn' onClick={e => change({...state,banner:"",bchanged:true})}>Remove Banner image</button>
            }
            
            <button className='saveBtn' 
            onClick={e => (isValid(state))?p.onSubmit(state,p.dispatch):alert("Fill the valid Information.\nAnd,Content should contain atleast 40 words.")} >Submit</button>
        </div>);
};


function upload(state,change)
{
    let file = document.getElementById('banner');

    let onChange = e => {
        
        let image = file.files[0];

        if((image.size/1024 )/1024 > 1.5 ) 
        return alert("Banner Image size should be less than 1.5 MB");

        if(/image\//.test(image.type))
        {
            let reader = new FileReader();
            reader.addEventListener('load', () => change({ ...state, banner: reader.result,bchanged:true}));
            reader.readAsDataURL(image);
        } 
        else change({...state,banner:"",bchanged:true});
        
        file.type = '';
        file.type = 'file';
        file.removeEventListener('change', onChange)
    };

    file.addEventListener('change',onChange);
    file.click();
}


function isValid({title,content})
{
   
    if (/[^`]{3,200}/.test(title.trim()) && /[^`]{200,}/.test(content.trim())) 
    return true;
    else return false;
}

export default form;