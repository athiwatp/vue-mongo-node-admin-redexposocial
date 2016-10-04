'use strict';

var express = require('express'), //minimalist framwork for requests, responses, etc.
    bodyParser = require('body-parser'), //access information passed in url or body
    morgan = require('morgan'),

    app = express() //initialize server

let API = require("./routers/api.js"), //assign api files to variable
    config = require("./config/config.js") //require config data

var port = process.env.PORT || 8080 //use port passed or 8080

app.set('view engine', 'html') //set view engine
app.use('/static', express.static( __dirname + '/public')) //say that /public will serve static files and rename that to /static on the urls
app.use('/components', express.static( __dirname + '/bower_components')) //use what's in /bower_components as static files and rename to just /components
app.use(bodyParser.json({limit: '2mb'})) //Get elements from body (JSON)
app.use(bodyParser.urlencoded({ extended: true})) //Get elements from URL
app.use(morgan('dev')) //HTTP request logger middleware for node.js

app.use('/api',API) //use the api

app.use(function(req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
}) //use the root site.com/ and send this

app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
}) //start the server
