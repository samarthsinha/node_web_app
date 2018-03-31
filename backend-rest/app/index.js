'use strict';
var express = require('express');
var expressLayouts = require('express-ejs-layouts');

var path = require('path');
const app = express();
var bodyParser = require('body-parser');

var port = 3000;
var User = require('./models/userModel');

//Template support added
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');
app.use(expressLayouts);
//Serves static files like css & imgs from below static mapping
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// Configures handlers here
require('./routes/routes')(app);
app.listen(port,function(){
    console.log("Server started at port "+port);
});


