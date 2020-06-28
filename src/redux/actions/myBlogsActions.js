
async function getAll(uid)
{
    let res = await fetch('/api/getAllMyBlogs/'+uid,);

    if(res.status >= 400) throw new Error("Failed to Fetch the Database.\n Login again later.");

    let json = await res.json();

    return { type: 'GET_ALL', blogs: json};
}



async function createBlog(blog)
{
    let res = await fetch('/api/createblog', 
                            {method: 'POST', headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify(blog)});

    if (res.status >= 400) throw new Error('Failed to create the blog.\nTry later.');

    let json = await res.json();

    return {type: 'CREATE' , blog: json}
}



async function deleteBlog(uid,_id,bid)
{

    let res = await fetch('/api/deleteblog/' + uid + '/' + _id + '/' + (bid ? bid : 'emptybid'));

    if (res.status >= 400) throw new Error("Failed to delete the blog.\ntry again later.");

    return {type: 'DELETE' , _id};
}


async function editBlog(edit)
{
    if (!edit.bchanged) edit.banner = '';

    let res = await fetch('/api/editblog', 
                { 
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(edit)
                }
    );

    if (res.status >= 400) throw new Error("Failed to Edit the blog.\ntry again later.");

    let json = await res.json();
    
    let blog = {
        title:json.title,
        content:json.content,
        _id:json._id,
        bannerid:json.bannerid,
        views:json.views
    };

    return {type:'EDIT',blog};
}


function clearMyBlogs()
{
    return { type: 'CLEAR'};
}

export {getAll , clearMyBlogs , createBlog , deleteBlog ,editBlog};