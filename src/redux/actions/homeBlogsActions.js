
async function getRecent(after)
{
    
    let res = await fetch('/api/getRecent/'+(after?after:'nope'));

    if(res.status >= 400) throw new Error('Blogs not found');

    let json = await res.json();

    return {type: 'RECENT' , blogs : json};
}


async function getPopular(after) {

   
    let res = await fetch('/api/getPopular/' + ((after > -1) ? after : 'nope'));

    if (res.status >= 400) throw new Error('Blogs not found.');

    let json = await res.json();

    return { type: 'POPULAR', blogs: json };
}


async function getSearched(searched)
{
    searched = searched.trim();

    if(!searched) throw new Error("Empty query.");

    let res = await fetch('api/getSearched/'+searched);

    if (res.status >= 400) throw new Error('Searched Blogs not found.');

    let json = await res.json();

    return { type: 'SEARCH', blogs: json };

}


function clearHomeBlogs()
{
    return {type: 'CLEAR_HOMEBLOGS'};
}

export {getRecent,clearHomeBlogs,getPopular,getSearched};