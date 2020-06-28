const express = require('express');
const app = express();
const apiRouter = require('./serverside/Router/api');

app.use(express.static('public'));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb',extended: true }));

app.use('/api',apiRouter);

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

let port = process.env.PORT || 3000;

app.listen(port,() => console.log("listening at "+port+"..."));

