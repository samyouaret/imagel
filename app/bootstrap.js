require('dotenv').config({ debug: true })
const express = require('express');
const path = require('path');
const webRouter = require('../routes/web');
const apiRouter = require('../routes/api');
const app = express();
const APP_PORT = process.env.APP_PORT || 8080;
const VIEWS_PATH = process.env.VIEWS_PATH || './resources/views';
const STATIC_PATH = process.env.STATIC_PATH || './public';

// app.engine('.ejs', require('ejs').__express);
app.set('view engine', 'ejs');

app.set('views', path.resolve(VIEWS_PATH));
app.use(express.static(path.resolve(STATIC_PATH)));

app.use(webRouter);
app.use(apiRouter);

//custom 404 middleware handler
app.use(function (req, res, next) {
    res.status(404).render('404', { appName: process.env.APP_NAME });
});

// custom  middleware to handle server error
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send("<h3>Sorry internal error occured.<h3>")
});

module.exports = {
    start: function () {
        app.listen(APP_PORT, function () {
            console.log(`server listening at http://localhost:${process.env.APP_PORT}`)
        });
    }
    , app, express
}