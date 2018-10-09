var express = require('express')
var app=express();

var todocontroller = require('./controller/todocontroller')

// set up templet engine
app.set('view engine','ejs')

//static files
app.use(express.static('./public'))

//fire controller

todocontroller(app)

//listen to port
app.listen(3000)
