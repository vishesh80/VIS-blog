const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://vishesh80:80vishesh@vidlydb-jtinm.mongodb.net/visblogs?retryWrites=true&w=majority",
                {useNewUrlParser: true, useUnifiedTopology: true}
)
.catch(err => console.error(err));


/*-----------------------------------MODELS------------------------------------- */

/*-------Utility------- */

function randomm()
{
    return Number(Math.random().toFixed(5));
}

const Blog = mongoose.model("blogs",new mongoose.Schema({
    title: String,
    content: String,
    uid: String,
    bannerid: String,
    date: {type: Number, default: Date.now},
    views: { type: Number, default: randomm}
}));



const Profile = mongoose.model('profiles',new mongoose.Schema({
    name: String,
    age: Number,
    country: String,
    city: String,
    bio: String,
    photoURL: String,
    uid:String
}));




const Banner = mongoose.model("banners", new mongoose.Schema({
    banner: String,
}));

const Contact = mongoose.model('Contacts',new mongoose.Schema({

    date: {type:Date, default: Date.now},
    name: String,
    email: String,
    desc: String

}));


/*--------------------------------- MYBLOGS CRUD fuctions------------------------------------- */





async function createBlog(data)
{
    let banner = {_id: ''};
    if (data.banner)banner = await saveBanner(data.banner);

    const blog = new Blog({
        title: data.title,
        content: data.content,
        uid: data.uid,
        bannerid: banner._id
    });

    let dataa = await blog.save();
    dataa.uid = null;
    dataa.__v = null;
    return dataa;
}






async function getAllMyBlogs(uid)
{
    let json = await Blog.find({uid: uid}).sort({date: -1}).select({__v: 0 , uid: 0,});                        
    return json;
}






async function deleteBlog(uid, _id,bid)
{
    let blog = await Blog.findOneAndDelete({ uid: uid, _id: _id }, { select: { __v: 0, uid: 0, }} );

    if (blog){

        Banner.findOneAndDelete({ _id: bid }).then(b => b).catch(err => console.error( err.message));
        return blog;
    } 
    else throw new Error("Blog not found.");
}






async function editBlog(edit)
{
    let blog = await Blog.findOne({_id:edit._id , uid: edit.uid});
    
    if(!blog) throw new Error('Blog not found.');

    blog.title = edit.title;
    blog.content = edit.content;

    if(edit.bchanged)
    {
        if(edit.bannerid)
        {
            Banner.findOneAndDelete({ _id: edit.bannerid })
            .then(b => b)
            .catch(err => console.error(err.message));

            blog.bannerid = '';
        }

        if(edit.banner)
        {
           let newbanner = await saveBanner(edit.banner);
           blog.bannerid = newbanner._id;
        }
    }

    let doc = await blog.save();
    let data = doc.toObject();

    delete data.uid;
    delete data.__v;

    return data;
}


async function updateViews(_id)
{
    let blog = await Blog.findOne({_id});

    
    if(blog)
    {
        ++blog.views;
        let saved = await blog.save();
        return {views: saved.views}
    }
    else throw new Error('Failed to update Views.');
}

/*--------------------------------- HOMEBLOGS CRUD fuctions------------------------------ */


async function getRecent(after)
{

    if(/nope/.test(after))
    {

        let blogs = await Blog.find({})
                              .sort({date: -1})
                              .limit(4)
                              .select({uid:0,__v:0});
                              
        return blogs;
    }
    else{

        let blogs = await Blog.find({date:{$lt: Number(after)}})
                                .sort({ date: -1 })
                                .limit(4)
                                .select({ uid: 0, __v: 0 });

        return blogs;                        
    }

}

async function getPopular(after) {


    if (/nope/.test(after)) {

        let blogs = await Blog.find({})
            .sort({ views: -1 })
            .limit(4)
            .select({ uid: 0, __v: 0 });

        return blogs;
    }
    else {

        let blogs = await Blog.find({ views: { $lt: Number(after) } })
            .sort({ views: -1 })
            .limit(4)
            .select({ uid: 0, __v: 0 });

        return blogs;
    }

}

async function getSearched(searched)
{
    let regex = new RegExp(searched,'i');

    let blogs = await Blog.find({title: regex})
                            .select({uid:0,__v:0});

    let uidList = await Profile.find({name: regex}).select({uid: 1});

    let udiArray = uidList.map(x => x.uid);

    let authorBlogs = await Blog.find({ uid: { $in: udiArray } }).select({ uid: 0, __v: 0 });

    return [...blogs,...authorBlogs];
}


/*------------------------Profile CRUD functions -------------------------*/



async function getProfile(uid)
{
    let profile = await Profile.findOne({uid:uid}).select({_id:0,__v:0,uid:0});

    if(profile) return profile;
    else throw new Error('Profile not Found');

}

async function clearProfile(uid) {

    let profile = await Profile.findOneAndDelete({ uid: uid }).select({ _id: 0, __v: 0, uid: 0 });

    if (profile) return profile;
    else throw new Error('Profile not Found');

}


async function editProfile(profile)
{
    let profilee = await Profile.findOne({uid:profile.uid});

    if(profilee){

        profilee.name = profile.name;
        profilee.age = profile.age;
        profilee.country = profile.country;
        profilee.city = profile.city;
        profilee.bio = profile.bio;
        profilee.photoURL = profile.photoURL;

        let doc = await profilee.save();
        let data = doc.toObject();

        delete data.uid;
        delete data._id;
        delete data.__v;

        return data;
    }
    else{

            let newProfile = new Profile({

                name: profile.name,
                age: profile.age,
                country: profile.country,
                city: profile.city,
                bio: profile.bio,
                photoURL: profile.photoURL,
                uid: profile.uid
            });

            let doc = await newProfile.save();
            let data = doc.toObject();

            delete data._id;
            delete data.__v;
            delete data.uid;
            
            return data;
    }
}

async function getAuthor(_id)
{
    let blog = await Blog.findOne({_id});
    
    if(blog)
    {
        let uid = blog.uid;

        let profile = await getProfile(uid);

        return profile;
    }
    else throw new Error('No profile found');
}


/*------------------------Banner CRUD functions------------------------- */




async function saveBanner(banner) {
    const bannerr = new Banner({
        banner: banner,
    });
    return await bannerr.save();
}




async function getBanner(bid) {

    if (/empty/.test(bid)) throw new Error("Empty bid");

    const banner = await Banner.findOne({ _id: bid });
    return banner;
}

/*-----------------------------Contacts CRUD---------------------------------- */

async function saveContact({name,email,desc})
{
    let contact = new Contact({

        name: name,
        email: email,
        desc: desc
    });

    return await contact.save();
}


/*-------------------------------Exports-------------------------------------------- */

module.exports.createBlog = createBlog;
module.exports.getAllMyBlogs = getAllMyBlogs;
module.exports.deleteBlog = deleteBlog;
module.exports.editBlog = editBlog;
module.exports.updateViews = updateViews;

module.exports.getRecent = getRecent;
module.exports.getPopular = getPopular;
module.exports.getSearched = getSearched;

module.exports.getProfile = getProfile;
module.exports.clearProfile = clearProfile;
module.exports.editProfile = editProfile;
module.exports.getAuthor = getAuthor;

module.exports.getBanner = getBanner;

module.exports.saveContact = saveContact;

