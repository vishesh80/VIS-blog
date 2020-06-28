import React,{useEffect,useState} from 'react';


const displayBlog = p => {

    let blog = JSON.parse(localStorage.getItem('displayBlog'));
    let date = new Date(blog.date);

    let [state,change] = useState({

        name: '',
        age:'',
        city:'',
        country:'',
        bio:'',
        photoURL:''
    });

    let [views,vchange] = useState(blog.views);

    let [banner,bchange] = useState('');

    useEffect(() => {

        let timeoutid = setTimeout(() => {

            fetch('/api/updateViews/'+blog._id)
                .then(res => {
                    if (res.status === 200) return res.json();
                    else throw new Error('Failed to Update Views.');
                })
                .then(json => vchange(json.views))
                .catch(err => console.error(err, err.message));
        },15000);

        let modal = document.getElementById('modal');
        modal.classList.toggle('modal');
    
        if(blog.bannerid) fetch('/api/Banner/'+blog.bannerid)
                            .then(res => {
                                if(res.status === 200) return res.json();
                                else throw new Error('Banner not found');
                            })
                            .then(json => bchange(json.banner))
                            .catch(err => console.error(err,err.message));


        fetch('/api/getAuthor/' + blog._id)
            .then(res => {
                if (res.status === 200) return res.json();
                else throw new Error('Profile not found');
            })
            .then(json => (json.photoURL) ? change(json) : change({ ...json, photoURL: './images/user.png'}))
            .catch(err => {
                console.error(err, err.message);
                change({ ...state, photoURL: './images/user.png', name:'Anonymous'});
            })
            .finally(() => modal.classList.toggle('modal'));

            

        return () => {

            clearTimeout(timeoutid);
            localStorage.clear()

        };


    },[]);

    return (
        <div className="displayBlogCont">


            <article>
                <h1>{blog.title}</h1>
                <section>
                    <img src="./images/date.jpg" alt="" /><p>{date.toDateString() + " "}</p>
                    <p className="viewCount">{parseInt(views)}</p><img src="./images/views.png" alt="" />
                </section>
                <img src={banner} alt=""/>

                <div>{formatContent(blog.content)}</div>
            </article>


            <aside>
                <h1>Author</h1>

                <div>
                    <div><img src={state.photoURL} alt=""/></div>

                    <section>
                    <h3>{state.name}</h3>
                    {(state.country)?<p>{state.age+" years old from "+state.city+', '+state.country}</p>:""}
                    <div>{formatContent(state.bio)}</div>
                    </section>

                </div>

            </aside>


        </div>
    );
    
};



function formatContent(content)
{
    let array = content.split(/\n\s*\n/);

    return array.map(x => <p key={Math.random()}>{x}</p>);
}


export default displayBlog;