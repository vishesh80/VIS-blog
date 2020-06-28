const express = require('express');
const db = require('../database/db');
const apiRouter = express.Router();



/*--------------------MyBlogs CRUD api-------------------------- */

apiRouter.post('/createblog',(req,res) => {

    db.createBlog(req.body)
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.error(err, err.message);
            res.status(500).end(err.message);
        });
});

apiRouter.get('/getAllMyBlogs/:uid',(req,res) => {


    db.getAllMyBlogs(req.params.uid)
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.error(err, err.message);
            res.status(500).end(err.message);
        });;
});



apiRouter.get('/deleteblog/:uid/:id/:bid', (req, res) => {

    db.deleteBlog(req.params.uid,req.params.id,req.params.bid)
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.error(err.message);
            res.status(500).end(err.message);
        });
});


apiRouter.post('/editblog',(req,res) => {

    db.editBlog(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => {
        console.error(err.message);
        res.status(500).end(err,err.message);
    });
});

apiRouter.get('/updateViews/:_id',(req,res) => {

    db.updateViews(req.params._id)
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.error(err.message);
            res.status(500).end(err,err.message);
        });

})

/*--------------------HomeBlogs CRUD api-------------------------- */


apiRouter.get('/getRecent/:after',(req,res) => {

    db.getRecent(req.params.after)
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.error(err,err.message);
            res.status(500).end(err.message);
        });
    
});

apiRouter.get('/getPopular/:after', (req, res) => {

    db.getPopular(req.params.after)
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.error(err, err.message);
            res.status(500).end(err.message);
        });

});

apiRouter.get('/getSearched/:searched', (req, res) => {

    db.getSearched(req.params.searched)
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.error(err, err.message);
            res.status(500).end(err.message);
        });

});

/*-------------------------Profile CRUD api----------------------------- */


apiRouter.get('/getProfile/:uid',(req, res) => {

    db.getProfile(req.params.uid)
    .then(data => res.status(200).json(data))
    .catch(err => {

            console.error(err,err.message);
            res.status(404).end(err.message);
        
    });
});

apiRouter.get('/clearProfile/:uid', (req, res) => {

    db.clearProfile(req.params.uid)
        .then(data => res.status(200).json(data))
        .catch(err => {

            console.error(err, err.message);
            res.status(404).end(err.message);

        });
});

apiRouter.post('/editProfile',(req,res) => {

    db.editProfile(req.body)
        .then(data => res.status(200).json(data))
        .catch(err => {

            console.error(err, err.message);
            res.status(404).end(err.message);

        });
});

apiRouter.get('/getAuthor/:_id',(req,res) => {

    db.getAuthor(req.params._id)
        .then(data => res.status(200).json(data))
        .catch(err => {

            console.error(err, err.message);
            res.status(404).end(err.message);

        });
});

/*------------------------Banner CRUD api------------------------------- */

apiRouter.get('/Banner/:bid',(req,res) => {

    db.getBanner(req.params.bid)
    .then(data => res.status(200).json(data))
    .catch(err => {
            console.error(err, err.message);
            res.status(500).end(err.message);
        });

});

/*-----------------------------Contacts CRUD---------------------------------- */

apiRouter.post('/saveContact',(req,res) => {

    db.saveContact(req.body)
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.error(err, err.message);
            res.status(500).end(err.message);
        });
    
});


module.exports = apiRouter;